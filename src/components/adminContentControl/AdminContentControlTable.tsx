import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pin, TrendingUp, Trash2 } from "lucide-react";
import {
    useGetAllAdminPost,
  usePostAction,
} from "@/hooks/useAdminModeration";
import { Button } from "../ui/button";

const AdminContentControlTable = ({page, limit, search}: {page: number, limit:number, search: string}) => {
     const { mutate: postMutate } = usePostAction();
     const { data: posts } = useGetAllAdminPost({ page, limit, search });
    // These will be replaced by your TanStack useMutation calls
  const handleTogglePin = (id: string, value: boolean) => {
    // console.log(value)
    postMutate({ post_id: id, action: "TOGGLE_PIN", currentValue: value });
  };

  const handleBoost = (id: string, score: number) => {
    // console.log("Boosting score for:", id);
    postMutate({ post_id: id, action: "BOOST_SCORE", currentValue: score });
  };

  const handleRemove = (id: string) => {
    if (confirm("Are you sure you want to remove this harmful content?")) {
      console.log("Removing post:", id);
      postMutate({ post_id: id, action: "REMOVE_POST" });
    } else return;
  };
  return (
    <>
    <Table>
            <TableHeader className="bg-[#151515]">
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="w-100  text-gray-300 text-start">
                  Content
                </TableHead>
                <TableHead className="text-gray-300 text-start">
                  Author
                </TableHead>
                <TableHead className="text-gray-300 text-start">
                  Trending Score
                </TableHead>
                <TableHead className="text-gray-300 text-start">
                  Status
                </TableHead>
                <TableHead className=" text-gray-300 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts?.allPostData?.map((post) => (
                <TableRow
                  key={post.id}
                  className="border-gray-800 hover:bg-[#111111] transition-colors"
                >
                  <TableCell className="font-medium">
                    <div className="flex flex-col gap-1">
                      <span className="line-clamp-2 text-sm">
                        {post.caption.slice(0, 40)}...
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border border-gray-700">
                        <AvatarFallback>
                          {post.author.fullname.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold">
                          {post.author.fullname}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3 w-3 text-purple-400" />
                      <span className="text-sm font-mono">
                        {post.trending_score}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      {post.is_pinned && (
                        <Badge className="bg-purple-900/30 text-[#D493FF] border-purple-500/50 flex gap-1">
                          <Pin className="h-3 w-3" /> Pinned
                        </Badge>
                      )}
                      <Badge
                        variant="outline"
                        className="text-green-400 border-green-900/50"
                      >
                        {post.visibility}
                      </Badge>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {/* BOOST BUTTON */}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 cursor-pointer w-8 text-gray-400 hover:text-purple-400 hover:bg-purple-400/10"
                        onClick={() =>
                          handleBoost(post.id, post.trending_score)
                        }
                      >
                        <TrendingUp className="h-4 w-4" />
                      </Button>

                      {/* PIN BUTTON */}
                      <Button
                        size="icon"
                        variant="ghost"
                        className={`h-8 cursor-pointer w-8 ${post.is_pinned ? "text-purple-400 bg-purple-400/10" : "text-gray-400 hover:text-purple-400"}`}
                        onClick={() => handleTogglePin(post.id, post.is_pinned)}
                      >
                        <Pin className="h-4 w-4" />
                      </Button>

                      {/* REMOVE BUTTON */}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 cursor-pointer text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                        onClick={() => handleRemove(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    </>
  )
}

export default AdminContentControlTable