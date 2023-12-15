import useUsers from "@/hooks/useUsers";
import Avatar from "../Avatar";

const FollowBar = () => {
  const { data: users = [] } = useUsers();
  if (users.length == 0) {
    return null
  }

  return (
    <div className="px-6 py-4 hidden sticky top-0 lg:block ">
          <div className="dark:bg-neutral-800 bg-slate-100 rounded-xl p-4 sticky top-0">
            <h2 className="dark:text-white text-xl font-semibold">Who to Follow</h2>
              <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col ">
                <p className="dark:text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
                  </div>
                ))}
                  
              </div>
        </div>
      
    </div>
  )
};

export default FollowBar;
