import { useGroup } from "@/contexts/GroupContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from "lucide-react";

export function GroupSwitcher() {
  const { activeGroup, userGroups, switchGroup } = useGroup();

  if (userGroups.length <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      <Users className="h-4 w-4 text-muted-foreground" />
      <Select value={activeGroup?.id || ""} onValueChange={switchGroup}>
        <SelectTrigger className="w-auto min-w-[180px] font-bold text-sm">
          <SelectValue placeholder="Pilih Grup" />
        </SelectTrigger>
        <SelectContent>
          {userGroups.map((g) => (
            <SelectItem key={g.id} value={g.id}>
              {g.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
