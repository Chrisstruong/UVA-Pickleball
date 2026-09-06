"use client";

import { useMemo, useState } from "react";
import { Search, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type Member = {
  id: string;
  full_name: string | null;
  club_group: "Tournament" | "Social" | "General" | null;
  membership_status: string | null;
  tryout_result: string | null;
  email_verified: boolean | null;
};

type GroupsClientProps = {
  members: Member[];
};

type GroupFilter =
  | "All"
  | "Tournament"
  | "Social"
  | "General"
  | "Unassigned";

export default function GroupsClient({
  members,
}: GroupsClientProps) {
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] =
    useState<GroupFilter>("All");

  const tournament = members.filter(
    (member) => member.club_group === "Tournament"
  );

  const social = members.filter(
    (member) => member.club_group === "Social"
  );

  const general = members.filter(
    (member) => member.club_group === "General"
  );

  const unassigned = members.filter(
    (member) => !member.club_group
  );

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.full_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ?? false;

      let matchesGroup = true;

      if (groupFilter === "Tournament") {
        matchesGroup =
          member.club_group === "Tournament";
      }

      if (groupFilter === "Social") {
        matchesGroup = member.club_group === "Social";
      }

      if (groupFilter === "General") {
        matchesGroup = member.club_group === "General";
      }

      if (groupFilter === "Unassigned") {
        matchesGroup = !member.club_group;
      }

      return matchesSearch && matchesGroup;
    });
  }, [members, search, groupFilter]);

  return (
    <div className="px-6 py-10 md:px-10">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E57200]">
            Member Management
          </p>

          <h1 className="font-bebas mt-3 text-5xl uppercase text-[#07192d] md:text-6xl">
            Groups
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Review Fall 2026 club placements and verify
            Tournament, Social, and General group assignments.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <GroupCard
            title="Tournament"
            count={tournament.length}
          />

          <GroupCard
            title="Social"
            count={social.length}
          />

          <GroupCard
            title="General"
            count={general.length}
          />

          <GroupCard
            title="Unassigned"
            count={unassigned.length}
          />
        </div>

        {/* Member List */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="text-xl text-[#07192d]">
                  Member Directory
                </CardTitle>

                <p className="mt-1 text-sm text-slate-500">
                  {filteredMembers.length} members shown
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search by member name..."
                  className="pl-9"
                />
              </div>
            </div>

            {/* Tabs */}
            <Tabs
              value={groupFilter}
              onValueChange={(value) =>
                setGroupFilter(value as GroupFilter)
              }
              className="mt-5"
            >
              <TabsList className="flex h-auto flex-wrap">
                <TabsTrigger value="All">
                  All ({members.length})
                </TabsTrigger>

                <TabsTrigger value="Tournament">
                  Tournament ({tournament.length})
                </TabsTrigger>

                <TabsTrigger value="Social">
                  Social ({social.length})
                </TabsTrigger>

                <TabsTrigger value="General">
                  General ({general.length})
                </TabsTrigger>

                <TabsTrigger value="Unassigned">
                  Unassigned ({unassigned.length})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>

                    <TableHead>
                      Group
                    </TableHead>

                    <TableHead>
                      Membership
                    </TableHead>

                    <TableHead>
                      Tryout Result
                    </TableHead>

                    <TableHead>
                      UVA Email
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredMembers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-32 text-center text-slate-500"
                      >
                        No members found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-semibold text-[#07192d]">
                          {member.full_name ||
                            "Unnamed Member"}
                        </TableCell>

                        <TableCell>
                          <GroupBadge
                            group={member.club_group}
                          />
                        </TableCell>

                        <TableCell>
                          <MembershipBadge
                            status={
                              member.membership_status
                            }
                          />
                        </TableCell>

                        <TableCell>
                          {member.tryout_result ||
                            "Pending"}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              member.email_verified
                                ? "default"
                                : "secondary"
                            }
                          >
                            {member.email_verified
                              ? "Verified"
                              : "Unverified"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function GroupCard({
  title,
  count,
}: {
  title: string;
  count: number;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wide text-slate-500">
          <Users className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-4xl font-bold text-[#07192d]">
          {count}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {count === 1 ? "member" : "members"}
        </p>
      </CardContent>
    </Card>
  );
}

function GroupBadge({
  group,
}: {
  group: Member["club_group"];
}) {
  if (!group) {
    return (
      <Badge variant="secondary">
        Unassigned
      </Badge>
    );
  }

  if (group === "Tournament") {
    return (
      <Badge className="bg-[#07192d] text-white hover:bg-[#07192d]">
        Tournament
      </Badge>
    );
  }

  if (group === "Social") {
    return (
      <Badge className="bg-[#E57200] text-white hover:bg-[#E57200]">
        Social
      </Badge>
    );
  }

  return (
    <Badge variant="outline">
      General
    </Badge>
  );
}

function MembershipBadge({
  status,
}: {
  status: string | null;
}) {
  if (status === "Active") {
    return (
      <Badge variant="outline">
        Active
      </Badge>
    );
  }

  return (
    <Badge variant="secondary">
      {status || "Pending"}
    </Badge>
  );
}