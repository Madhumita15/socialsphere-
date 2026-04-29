// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Image from "next/image";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Users, Ban, Crown, CheckCircle2, Lock } from "lucide-react";

// const items = [
//   { label: "change Role", value: null },
//   { label: "User", value: "user" },
//   { label: "Modearator", value: "moderator" },
// ];

// const UserManagement = () => {
//   const users = [
//     {
//       id: "1",
//       name: "Alex Rivera",
//       email: "alex.rivera@example.com",
//       avatar: "/images/profile.png",
//       role: "user",
//       status: "active",
//       createdAt: "2026-04-10",
//     },
//     {
//       id: "2",
//       name: "Elena Vance",
//       email: "elena.vance@example.com",
//       avatar: "/images/profile.png",
//       role: "moderator",
//       status: "active",
//       createdAt: "2026-03-22",
//     },
//     {
//       id: "3",
//       name: "John Carter",
//       email: "john.carter@example.com",
//       avatar: "/images/profile.png",
//       role: "user",
//       status: "blocked",
//       createdAt: "2026-02-15",
//     },
//     {
//       id: "4",
//       name: "Sophia Lee",
//       email: "sophia.lee@example.com",
//       avatar: "/images/profile.png",
//       role: "user",
//       status: "active",
//       createdAt: "2026-01-30",
//     },
//     {
//       id: "5",
//       name: "Michael Brown",
//       email: "michael.brown@example.com",
//       avatar: "/images/profile.png",
//       role: "moderator",
//       status: "blocked",
//       createdAt: "2026-02-05",
//     },
//     {
//       id: "6",
//       name: "Emma Wilson",
//       email: "emma.wilson@example.com",
//       avatar: "/images/profile.png",
//       role: "user",
//       status: "active",
//       createdAt: "2026-04-01",
//     },
//     {
//       id: "7",
//       name: "David Miller",
//       email: "david.miller@example.com",
//       avatar: "/images/profile.png",
//       role: "user",
//       status: "active",
//       createdAt: "2026-03-18",
//     },
//     {
//       id: "8",
//       name: "Olivia Garcia",
//       email: "olivia.garcia@example.com",
//       avatar: "/images/profile.png",
//       role: "moderator",
//       status: "active",
//       createdAt: "2026-04-12",
//     },
//   ];
//   return (
//     <>
//       <div className="min-h-screen bg-[#151515] p-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="mb-12">
//             <h1 className="text-4xl font-bold text-white mb-2">
//               User Management
//             </h1>
//             <p className="text-slate-400 text-lg">
//               Oversee, moderate, and manage your global community of{" "}
//               <span className="text-[#D493FF] font-semibold">42.8k users</span>.
//             </p>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//             <div className="bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#D493FF] transition-all duration-300 hover:shadow-lg hover:shadow-[#D493FF]/10">
//               <p className="text-[#999999] text-sm font-medium mb-2">
//                 Active Users
//               </p>
//               <div className="flex items-end justify-between">
//                 <div>
//                   <p className="text-3xl font-bold text-white">activeUser</p>
//                   <p className="text-[#D493FF] text-sm font-semibold mt-1">
//                     +12%
//                   </p>
//                 </div>
//                 <Users className="w-10 h-10 text-[#D493FF]/40" />
//               </div>
//             </div>

//             <div className="bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#FF7354] transition-all duration-300 hover:shadow-lg hover:shadow-[#FF7354]/10">
//               <p className="text-[#999999] text-sm font-medium mb-2">
//                 Blocked Users
//               </p>
//               <div className="flex items-end justify-between">
//                 <div>
//                   <p className="text-3xl font-bold text-white">blockedUsers</p>
//                   <p className="text-[#FF7354] text-sm font-semibold mt-1">
//                     -5%
//                   </p>
//                 </div>
//                 <Ban className="w-10 h-10 text-[#FF7354]/40" />
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="bg-black border border-[#2a2a2a] rounded-xl overflow-hidden shadow-2xl">
//             <Table>
//               <TableHeader className="bg-[#0a0a0a] border-b border-[#2a2a2a]">
//                 <TableRow className="hover:bg-[#0a0a0a]">
//                   <TableHead className="text-white font-bold text-center py-3 px-2 text-sm">
//                     USER
//                   </TableHead>
//                   <TableHead className="text-white font-bold text-center py-3 px-2 text-sm">
//                     ROLE
//                   </TableHead>
//                   <TableHead className="text-white font-bold text-center py-3 px-2 text-sm">
//                     STATUS
//                   </TableHead>
//                   <TableHead className="text-white font-bold text-center py-3 px-2 text-sm">
//                     JOINED DATE
//                   </TableHead>
//                   <TableHead className="text-white font-bold text-center py-3 px-2 text-sm">
//                     ACTION
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {users?.map((user) => (
//                   <TableRow
//                     key={user.id}
//                     className=" border-b border-[#2a2a2a]
//     hover:bg-[#0f0f0f]
//     focus:bg-[#0f0f0f]
//     data-[state=selected]:bg-[#0f0f0f]
//     data-[state=open]:bg-[#0f0f0f]
//     transition-colors duration-200"
//                   >
//                     <TableCell className="font-medium py-3 px-2">
//                       <div className="flex flex-row items-center gap-3">
//                         <Image
//                           src={user.avatar}
//                           alt={user.name}
//                           width={40}
//                           height={40}
//                           className="rounded-full ring-2 ring-[#D493FF]/40 hover:ring-[#D493FF] transition-all duration-300"
//                         />
//                         <div>
//                           <h3 className="text-white font-semibold text-sm hover:text-[#D493FF] transition-colors">
//                             {user.name}
//                           </h3>
//                           <p className="text-[#666666] text-xs">{user.email}</p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-center py-3 px-2">
//                       <span
//                         className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 w-fit mx-auto transition-all duration-200 ${
//                           user.role === "moderator"
//                             ? "bg-[#D493FF]/15 text-[#D493FF] border border-[#D493FF]/30"
//                             : "bg-[#FACC15]/15 text-[#FACC15] border border-[#FACC15]/30"
//                         }`}
//                       >
//                         {user.role === "moderator" ? (
//                           <Crown className="w-3 h-3" />
//                         ) : (
//                           <Users className="w-3 h-3" />
//                         )}
//                         {user.role === "moderator" ? "Moderator" : "User"}
//                       </span>
//                     </TableCell>
//                     <TableCell className="text-center py-3 px-2">
//                       <span
//                         className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 w-fit mx-auto transition-all duration-200 ${
//                           user.status === "active"
//                             ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
//                             : "bg-[#FF7354]/15 text-[#FF7354] border border-[#FF7354]/30"
//                         }`}
//                       >
//                         {user.status === "active" ? (
//                           <CheckCircle2 className="w-3 h-3" />
//                         ) : (
//                           <Lock className="w-3 h-3" />
//                         )}
//                         {user.status === "active" ? "Active" : "Blocked"}
//                       </span>
//                     </TableCell>
//                     <TableCell className="text-center py-3 px-2 text-[#666666] text-sm">
//                       {user.createdAt}
//                     </TableCell>
//                     <TableCell className="py-3 px-2">
//                       <div className="flex flex-col gap-2">
//                         <Button
//                           className={`w-full transition-all duration-200 font-semibold text-xs py-2 h-8 ${
//                             user.status === "active"
//                               ? "bg-[#D493FF] hover:bg-[#D493FF]/90 text-white border border-[#D493FF]/40 active:bg-[#D493FF]"
//                               : "bg-[#FACC15] hover:bg-[#FACC15]/90 text-black border border-[#FACC15]/40 active:bg-[#FACC15]"
//                           }`}
//                         >
//                           {user.status === "active" ? "Block" : "Unblock"}
//                         </Button>

//                         <Select>
//                           <SelectTrigger className="w-full bg-[#1a1a1a] border-[#333333] text-white hover:border-[#D493FF] text-xs h-8 py-1">
//                             <SelectValue placeholder="Role" />
//                           </SelectTrigger>
//                           <SelectContent className="bg-[#1a1a1a] border border-[#333333]">
//                             <SelectGroup>
//                               <SelectLabel className="text-[#666666] text-xs">
//                                 Role
//                               </SelectLabel>
//                               {items.map((item) => (
//                                 <SelectItem
//                                   key={item.value}
//                                   value={item.value || ""}
//                                   className="text-white text-xs hover:bg-[#333333] focus:bg-[#333333] cursor-pointer"
//                                 >
//                                   {item.label}
//                                 </SelectItem>
//                               ))}
//                             </SelectGroup>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserManagement;


import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

import { Users, Ban, Crown, CheckCircle2, Lock } from "lucide-react";



const UserManagement = () => {
  const users = [
    {
      id: "1",
      name: "Alex Rivera",
      email: "alex.rivera@example.com",
      avatar: "/images/profile.png",
      role: "user",
      status: "active",
      createdAt: "2026-04-10",
    },
    {
      id: "2",
      name: "Elena Vance",
      email: "elena.vance@example.com",
      avatar: "/images/profile.png",
      role: "moderator",
      status: "active",
      createdAt: "2026-03-22",
    },
    {
      id: "3",
      name: "John Carter",
      email: "john.carter@example.com",
      avatar: "/images/profile.png",
      role: "user",
      status: "blocked",
      createdAt: "2026-02-15",
    },
    {
      id: "4",
      name: "Sophia Lee",
      email: "sophia.lee@example.com",
      avatar: "/images/profile.png",
      role: "user",
      status: "active",
      createdAt: "2026-01-30",
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "/images/profile.png",
      role: "moderator",
      status: "blocked",
      createdAt: "2026-02-05",
    },
    {
      id: "6",
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      avatar: "/images/profile.png",
      role: "user",
      status: "active",
      createdAt: "2026-04-01",
    },
    {
      id: "7",
      name: "David Miller",
      email: "david.miller@example.com",
      avatar: "/images/profile.png",
      role: "user",
      status: "active",
      createdAt: "2026-03-18",
    },
    {
      id: "8",
      name: "Olivia Garcia",
      email: "olivia.garcia@example.com",
      avatar: "/images/profile.png",
      role: "moderator",
      status: "active",
      createdAt: "2026-04-12",
    },
  ];
  return (
    <>
      <div className="min-h-screen bg-[#151515] p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">
              User Management
            </h1>
            <p className="text-slate-400 text-lg">
              Oversee, moderate, and manage your global community of{" "}
              <span className="text-[#D493FF] font-semibold">42.8k users</span>.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#D493FF] transition-all duration-300 hover:shadow-lg hover:shadow-[#D493FF]/10">
              <p className="text-[#999999] text-sm font-medium mb-2">
                Active Users
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-white">activeUser</p>
                  <p className="text-[#D493FF] text-sm font-semibold mt-1">
                    +12%
                  </p>
                </div>
                <Users className="w-10 h-10 text-[#D493FF]/40" />
              </div>
            </div>

            <div className="bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#FF7354] transition-all duration-300 hover:shadow-lg hover:shadow-[#FF7354]/10">
              <p className="text-[#999999] text-sm font-medium mb-2">
                Blocked Users
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-white">blockedUsers</p>
                  <p className="text-[#FF7354] text-sm font-semibold mt-1">
                    -5%
                  </p>
                </div>
                <Ban className="w-10 h-10 text-[#FF7354]/40" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-black border border-[#2a2a2a] rounded-xl overflow-hidden shadow-2xl">
            <Table>
              <TableHeader className="bg-[#0a0a0a] border-b border-[#2a2a2a]">
                <TableRow className="hover:bg-[#0a0a0a]">
                  <TableHead className="text-white font-bold text-center py-3 px-2 text-sm">
                    USER
                  </TableHead>
                  <TableHead className="text-white font-bold text-center py-3 px-2 text-sm">
                    ROLE
                  </TableHead>
                  <TableHead className="text-white font-bold text-center py-3 px-2 text-sm">
                    STATUS
                  </TableHead>
                  <TableHead className="text-white font-bold text-center py-3 px-2 text-sm">
                    JOINED DATE
                  </TableHead>
                  <TableHead className="text-white font-bold text-center py-3 px-2 text-sm">
                    ACTION
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user) => (
                  <TableRow
                    key={user.id}
                    className=" border-b border-[#2a2a2a]
    hover:bg-[#0f0f0f]
    focus:bg-[#0f0f0f]
    data-[state=selected]:bg-[#0f0f0f]
    data-[state=open]:bg-[#0f0f0f]
    transition-colors duration-200"
                  >
                    <TableCell className="font-medium py-3 px-2">
                      <div className="flex flex-row items-center gap-3">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="rounded-full ring-2 ring-[#D493FF]/40 hover:ring-[#D493FF] transition-all duration-300"
                        />
                        <div>
                          <h3 className="text-white font-semibold text-sm hover:text-[#D493FF] transition-colors">
                            {user.name}
                          </h3>
                          <p className="text-[#666666] text-xs">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-3 px-2">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 w-fit mx-auto transition-all duration-200 ${
                          user.role === "moderator"
                            ? "bg-[#D493FF]/15 text-[#D493FF] border border-[#D493FF]/30"
                            : "bg-[#FACC15]/15 text-[#FACC15] border border-[#FACC15]/30"
                        }`}
                      >
                        {user.role === "moderator" ? (
                          <Crown className="w-3 h-3" />
                        ) : (
                          <Users className="w-3 h-3" />
                        )}
                        {user.role === "moderator" ? "Moderator" : "User"}
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-3 px-2">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 w-fit mx-auto transition-all duration-200 ${
                          user.status === "active"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-[#FF7354]/15 text-[#FF7354] border border-[#FF7354]/30"
                        }`}
                      >
                        {user.status === "active" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Lock className="w-3 h-3" />
                        )}
                        {user.status === "active" ? "Active" : "Blocked"}
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-3 px-2 text-[#666666] text-sm">
                      {user.createdAt}
                    </TableCell>
                    <TableCell className="py-3 px-2">
                      <div className="flex flex-col gap-2">
                        <Button
                          className={`w-full transition-all duration-200 font-semibold text-xs py-2 h-8 ${
                            user.status === "active"
                              ? "bg-[#D493FF] hover:bg-[#D493FF]/90 text-white border border-[#D493FF]/40 active:bg-[#D493FF]"
                              : "bg-[#FACC15] hover:bg-[#FACC15]/90 text-black border border-[#FACC15]/40 active:bg-[#FACC15]"
                          }`}
                        >
                          {user.status === "active" ? "Block" : "Unblock"}
                        </Button>

                        <div className="flex gap-2">
                          <Button
                            className={`flex-1 transition-all duration-200 font-semibold text-xs py-2 h-8 ${
                              user.role === "user"
                                ? "bg-[#FACC15]/30 text-[#FACC15] border border-[#FACC15]/30 cursor-default opacity-50"
                                : "bg-[#FACC15]/15 text-[#FACC15] border border-[#FACC15]/30 hover:bg-[#FACC15]/25"
                            }`}
                          >
                            User
                          </Button>
                          <Button
                            className={`flex-1 transition-all duration-200 font-semibold text-xs py-2 h-8 ${
                              user.role === "moderator"
                                ? "bg-[#D493FF]/30 text-[#D493FF] border border-[#D493FF]/30 cursor-default opacity-50"
                                : "bg-[#D493FF]/15 text-[#D493FF] border border-[#D493FF]/30 hover:bg-[#D493FF]/25"
                            }`}
                          >
                            Moderator
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
