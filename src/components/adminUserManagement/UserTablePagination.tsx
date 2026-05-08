import { Button } from "@/components/ui/button";
import { useGetAllUser } from "@/hooks/useAdminUserMnagement";
import { UserTablePaginationType } from "@/typescript/type/adminUserManagement.type";



const UserTablePagination:React.FC<UserTablePaginationType> = ({ page, limit, setPage }) => {
  const { data: getAllUsers } = useGetAllUser({ page, limit });
  const totalCount = getAllUsers?.count ?? 0;
  const totalPage = Math.ceil(totalCount / limit);

  return (
    <>
      <div className="flex gap-4 mt-4 items-center pt-7 ml-185 pb-9">
        <Button
          variant="destructive"
          className={
            " bg-[#FF7354]/20 text-[#e2d4d0] border border-[#FF7354]/40  px-4 cursor-pointer"
          }
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>

        <span className="text-white flex">
          Page {page + 1} of {totalPage} data - {totalCount}
        </span>

        <Button
          className={
            "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 cursor-pointer px-6"
          }
          disabled={page >= totalPage - 1}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default UserTablePagination;
