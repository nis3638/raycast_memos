import { LaunchProps, Toast, showToast } from "@raycast/api";
import { sendMemo } from "./api";

interface TodoArguments {
  text: string;
}

export default async function Command(props: LaunchProps<{ arguments: TodoArguments }>) {
  const { text = "" } = props.arguments;

  showToast({
    style: Toast.Style.Animated,
    title: "Sending",
  });
  // Add logging here
  console.log("Data being sent:", {
    content: text,
    visibility: "PRIVATE",
    resourceIdList: [],
  });
  try {
    const response = await sendMemo({
      content: text,
      visibility: "PRIVATE",
      resourceIdList: [],
    });
    if (response?.uid) {
      showToast({
        style: Toast.Style.Success,
        title: "Sent",
      });
    } else {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed",
      });
    }
  } catch (error) {
    console.error("Error sending memo:", error);
    showToast({
      style: Toast.Style.Failure,
      title: "Error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
  


}
