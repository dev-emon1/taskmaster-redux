import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function MenuDropdown({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await dispatch(logoutUser());

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Logged out successfully");
      navigate("/login");
    } else {
      toast.error("Logout failed");
    }
  };

  const menuItemClass = (active) =>
    `${
      active ? "bg-primary text-white" : "text-gray-900"
    } group flex w-full items-center rounded-md px-2 py-2 text-sm`;

  return (
    <Menu as="div" className="relative inline-block text-left z-[999]">
      <div>
        <Menu.Button as="button" className="outline-none">
          {children}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className={menuItemClass(active)}
                >
                  Profile
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => navigate("/settings")}
                  className={menuItemClass(active)}
                >
                  Settings
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={handleLogout}
                  className={menuItemClass(active)}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
