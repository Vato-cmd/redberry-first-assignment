import { useModal } from "../../context/ModalContext";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import ProfileModal from "./ProfileModal";
import ConfirmProfileModal from "./ConfirmProfileModal";
import EnrollmentConfirmed from "./EnrollmentConfirmed";
import ConflictModal from "./ConflictModal";

export default function ModalRoot() {
  const { modal } = useModal();

  if (!modal) return null;

  switch (modal.type) {
    case "login":
      return <LoginModal />;
    case "signup":
      return <SignupModal />;
    case "profile":
      return <ProfileModal />;
    case "confirm":
      return <ConfirmProfileModal />;
    case "enroll-confirmed":
      return <EnrollmentConfirmed />;
    case "conflict":
      return <ConflictModal />;
    default:
      return null;
  }
}
