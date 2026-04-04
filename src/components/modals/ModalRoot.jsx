import { useModal } from "../../context/ModalContext";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

export default function ModalRoot() {
  const { modal } = useModal();

  if (!modal) return null;

  switch (modal.type) {
    case "login":
      return <LoginModal />;

    case "signup":
      return <SignupModal />;

    default:
      return null;
  }
}
