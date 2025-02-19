import axios, { AxiosError } from "axios";
import { Button } from "../ui/button";
import {
  API_BASE_URL,
  API_ROUTES,
  APP_ROUTES,
} from "../../constants/routes.constants";
import { useToast } from "../../hooks/use-toast";
import { useNavigate } from "react-router";
import { TOKEN } from "../../constants/token.constant";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const logout = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${API_ROUTES.logout}`,
        {},
        {
          headers: {
            Authorization: TOKEN,
          },
        },
      );

      if (response.status === 200) {
        localStorage.removeItem("isAuth");
        toast({ title: response.data.message });
        navigate(APP_ROUTES.login);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({ title: `Ошибка! ${error.response?.data.detail}` });
        throw new Error(error.response?.data.message);
      }
    }
  };

  return (
    <Button
      type="button"
      onClick={logout}
      className="bg-slate-700 cursor-pointer"
    >
      Logout
    </Button>
  );
}
