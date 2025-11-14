import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import { Plus, Edit2 } from "lucide-react";

type Shoutout = {
  id: string;
  tip_id: string;
  featured_until: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  tips: {
    donor_name: string | null;
    donor_email: string;
    amount: number;
    tier_label: string;
    message: string | null;
  };
};

type Tip = {
  id: string;
  donor_name: string | null;
  donor_email: string;
  amount: number;
  tier_label: string;
  payment_status: string;
};

export const ShoutoutsTable = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const [eligibleTips, setEligibleTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingShoutout, setEditingShoutout] = useState<Shoutout | null>(null);
  const [selectedTipId, setSelectedTipId] = useState<string>("");
  const [status, setStatus] = useState("pending");
  const [notes, setNotes] = useState("");
  const [featuredDays, setFeaturedDays] = useState("30");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch shoutouts with tip details
    const { data: shoutoutsData, error: shoutoutsError } = await supabase
      .from("shoutouts")
      .select(`
        *,
        tips (
          donor_name,
          donor_email,
          amount,
          tier_label,
          message
        )
      `)
      .order("created_at", { ascending: false });

    if (shoutoutsError) {
      toast.error("Failed to load shoutouts");
      console.error(shoutoutsError);
    } else {
      setShoutouts(shoutoutsData || []);
    }

    // Fetch tips that don't have shoutouts yet (for dropdown)
    const { data: tipsData, error: tipsError } = await supabase
      .from("tips")
      .select("id, donor_name, donor_email, amount, tier_label, payment_status")
      .eq("payment_status", "completed")
      .gte("amount", 25)
      .order("created_at", { ascending: false });

    if (tipsError) {
      console.error(tipsError);
    } else {
      // Filter out tips that already have shoutouts
      const existingTipIds = shoutoutsData?.map(s => s.tip_id) || [];
      const filtered = tipsData?.filter(t => !existingTipIds.includes(t.id)) || [];
      setEligibleTips(filtered);
    }

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const featuredUntil = new Date();
    featuredUntil.setDate(featuredUntil.getDate() + parseInt(featuredDays));

    if (editingShoutout) {
      const { error } = await supabase
        .from("shoutouts")
        .update({
          status,
          notes,
          featured_until: featuredUntil.toISOString(),
        })
        .eq("id", editingShoutout.id);

      if (error) {
        toast.error("Failed to update shoutout");
        console.error(error);
      } else {
        toast.success("Shoutout updated successfully!");
        setOpen(false);
        fetchData();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from("shoutouts")
        .insert({
          tip_id: selectedTipId,
          status,
          notes,
          featured_until: featuredUntil.toISOString(),
        });

      if (error) {
        toast.error("Failed to create shoutout");
        console.error(error);
      } else {
        toast.success("Shoutout created successfully!");
        setOpen(false);
        fetchData();
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setSelectedTipId("");
    setStatus("pending");
    setNotes("");
    setFeaturedDays("30");
    setEditingShoutout(null);
  };

  const openEditDialog = (shoutout: Shoutout) => {
    setEditingShoutout(shoutout);
    setStatus(shoutout.status);
    setNotes(shoutout.notes || "");
    if (shoutout.featured_until) {
      const daysUntil = Math.ceil(
        (new Date(shoutout.featured_until).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      setFeaturedDays(Math.max(1, daysUntil).toString());
    }
    setOpen(true);
  };

  if (loading) {
    return <div className="text-center text-muted-foreground">Loading shoutouts...</div>;
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="font-display text-2xl">Shoutouts Management</CardTitle>
            <CardDescription>Manage featured tip shoutouts</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                New Shoutout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingShoutout ? "Edit Shoutout" : "Create New Shoutout"}</DialogTitle>
                <DialogDescription>
                  {editingShoutout ? "Update shoutout details" : "Select a tip to feature"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!editingShoutout && (
                  <div className="space-y-2">
                    <Label htmlFor="tip">Select Tip (≥$25)</Label>
                    <Select value={selectedTipId} onValueChange={setSelectedTipId} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a tip..." />
                      </SelectTrigger>
                      <SelectContent>
                        {eligibleTips.map((tip) => (
                          <SelectItem key={tip.id} value={tip.id}>
                            ${tip.amount} - {tip.donor_name || tip.donor_email} ({tip.tier_label})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="days">Featured Duration (days)</Label>
                  <Input
                    id="days"
                    type="number"
                    min="1"
                    value={featuredDays}
                    onChange={(e) => setFeaturedDays(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Internal notes about this shoutout..."
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  {editingShoutout ? "Update Shoutout" : "Create Shoutout"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured Until</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shoutouts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No shoutouts yet. Create one to get started!
                  </TableCell>
                </TableRow>
              ) : (
                shoutouts.map((shoutout) => (
                  <TableRow key={shoutout.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {shoutout.tips.donor_name || "Anonymous"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {shoutout.tips.donor_email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${shoutout.tips.amount}
                    </TableCell>
                    <TableCell>{shoutout.tips.tier_label}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          shoutout.status === "active"
                            ? "bg-green-500/20 text-green-400 border-green-500/50"
                            : shoutout.status === "completed"
                            ? "bg-gray-500/20 text-gray-400 border-gray-500/50"
                            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                        }
                      >
                        {shoutout.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {shoutout.featured_until
                        ? format(new Date(shoutout.featured_until), "MMM d, yyyy")
                        : "-"}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {shoutout.tips.message || "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(shoutout)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
