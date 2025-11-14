import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";

type Tip = {
  id: string;
  donor_email: string;
  donor_name: string | null;
  amount: number;
  tip_type: string;
  tier_label: string;
  message: string | null;
  payment_status: string;
  payment_provider: string;
  created_at: string;
};

export const TipsTable = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    const { data, error } = await supabase
      .from("tips")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load tips");
      console.error(error);
    } else {
      setTips(data || []);
    }
    setLoading(false);
  };

  const filteredTips = tips.filter((tip) => {
    const matchesSearch = 
      tip.donor_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.donor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.tier_label.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || tip.payment_status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/20 text-green-400 border-green-500/50";
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "failed": return "bg-red-500/20 text-red-400 border-red-500/50";
      case "refunded": return "bg-gray-500/20 text-gray-400 border-gray-500/50";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return <div className="text-center text-muted-foreground">Loading tips...</div>;
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="font-display text-2xl">Tips Management</CardTitle>
        <CardDescription>View and manage all tip transactions</CardDescription>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Input
            placeholder="Search by email, name, or tier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Donor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTips.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    No tips found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTips.map((tip) => (
                  <TableRow key={tip.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(tip.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{tip.donor_name || "Anonymous"}</div>
                        <div className="text-sm text-muted-foreground">{tip.donor_email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">${tip.amount}</TableCell>
                    <TableCell className="capitalize">{tip.tip_type}</TableCell>
                    <TableCell>{tip.tier_label}</TableCell>
                    <TableCell className="capitalize">{tip.payment_provider}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(tip.payment_status)}>
                        {tip.payment_status}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {tip.message || "-"}
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
