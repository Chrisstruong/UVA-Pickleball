"use client";

import {
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { Search, Users } from "lucide-react";
import { updateMemberGroup } from "@/app/admin/groups/actions";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  email: string;
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
  const [currentPage, setCurrentPage] = useState(1);
  const MEMBERS_PER_PAGE = 25;
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
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        member.full_name?.toLowerCase().includes(searchTerm) ||
        member.email.toLowerCase().includes(searchTerm);

      let matchesGroup = true;

      if (groupFilter === "Tournament") {
        matchesGroup = member.club_group === "Tournament";
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

  const totalPages = Math.ceil(
    filteredMembers.length / MEMBERS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * MEMBERS_PER_PAGE;

  const paginatedMembers = filteredMembers.slice(
    startIndex,
    startIndex + MEMBERS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, groupFilter]);
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
                  Member List
                </CardTitle>

                <p className="mt-1 text-sm text-slate-500">
                  Showing{" "}
                  {filteredMembers.length === 0
                    ? 0
                    : startIndex + 1}
                  –
                  {Math.min(
                    startIndex + MEMBERS_PER_PAGE,
                    filteredMembers.length
                  )}{" "}
                  of {filteredMembers.length} members
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
                  placeholder="Search by name or UVA email..."
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
                <TableHeader className="sticky top-0 z-10 bg-white">
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

                    <TableHead>
                      Change Group
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredMembers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="py-3 h-32 text-center text-slate-500"
                      >
                        No members found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="py-3 font-semibold text-[#07192d]">
                          {member.full_name || "Unnamed Member"}
                        </TableCell>

                        <TableCell className="py-3">
                          <GroupBadge group={member.club_group} />
                        </TableCell>

                        <TableCell className="py-3">
                          <MembershipBadge
                            status={member.membership_status}
                          />
                        </TableCell>

                        <TableCell className="py-3">
                          {member.tryout_result || "Pending"}
                        </TableCell>

                        <TableCell className="py-3">
                          <div>
                            <p className="font-medium text-[#07192d]">
                              {member.email || "No email"}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {member.email_verified
                                ? "Verified"
                                : "Unverified"}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell className="py-3">
                          <GroupSelector
                            memberId={member.id}
                            currentGroup={member.club_group}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t pt-4">
                  <p className="text-sm text-slate-500">
                    Page {currentPage} of {totalPages}
                  </p>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() =>
                        setCurrentPage((page) => page - 1)
                      }
                      className="rounded-md border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((page) => page + 1)
                      }
                      className="rounded-md border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
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

function GroupSelector({
  memberId,
  currentGroup,
}: {
  memberId: string;
  currentGroup: Member["club_group"];
}) {
  const [isPending, startTransition] =
    useTransition();

  const handleChange = (value: string) => {
    const newGroup =
      value === "Unassigned"
        ? null
        : (value as
          | "Tournament"
          | "Social"
          | "General");

    startTransition(async () => {
      try {
        const result = await updateMemberGroup(
          memberId,
          newGroup
        );

        console.log("Group updated:", result);
      } catch (error) {
        console.error(
          "Failed to change group:",
          error
        );
      }
    });
  };

  return (
    <Select
      value={currentGroup ?? "Unassigned"}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[160px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="Tournament">
          Tournament
        </SelectItem>

        <SelectItem value="Social">
          Social
        </SelectItem>

        <SelectItem value="General">
          General
        </SelectItem>

        <SelectItem value="Unassigned">
          Unassigned
        </SelectItem>
      </SelectContent>
    </Select>
  );
}