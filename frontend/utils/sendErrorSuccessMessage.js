import { toast } from "react-toastify"

const sendErrorSuccessMessage = (type, message) => {
    toast.dismiss();
    if(type === 'success'){
        toast.success(message, {
            style: { background: "#121212", color: "#FFC600", borderRadius: "0.75rem" },
            progressStyle: { background: "#121212" },
            iconTheme: {
                primary: "#FFC600",
                secondary: "#121212"
            }
        });
    } else {
        toast.error(message, {
            style: { background: "#121212", color: "#FFC600", borderRadius: "0.75rem" },
            progressStyle: { background: "#121212" },
            iconTheme: {
                primary: "#FFC600",
                secondary: "#121212"
            }
        });
    }
}

export default sendErrorSuccessMessage