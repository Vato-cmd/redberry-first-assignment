import toast from "react-hot-toast";

export function confirmToast(message, onConfirm) {
  toast((t) => (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium">{message}</p>

      <div className="flex gap-2 justify-end">
        <button onClick={() => toast.dismiss(t.id)}>Cancel</button>

        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm();
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  ));
}
