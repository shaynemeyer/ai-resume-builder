import { Experience } from "@/types/experience";
import FormInput from "../form/FormInput";
import { Button } from "../ui/button";

interface ExperienceFormProps {
  resumeId?: number;
  experience?: Experience;
  actionButtonText?: string;
  closeAction?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ExperienceForm({
  resumeId = 0,
  experience,
  actionButtonText = "Save",
  closeAction,
}: ExperienceFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData) as unknown as Experience;
    console.log("rawData: " + JSON.stringify(rawData));

    // TODO: call API to save experience

    // todo: if api succeeds and a close action has been passed in, close the sheet.
    if (closeAction) closeAction(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="form">
        <input type="hidden" name="resumeId" value={resumeId} />
        <input type="hidden" name="id" value={experience?.id} />

        <FormInput
          name="title"
          type="text"
          placeholder="Job title"
          defaultValue={experience?.title || ""}
          required={true}
        />
        <FormInput
          name="company"
          type="text"
          placeholder="Company name"
          defaultValue={experience?.company || ""}
          required={true}
        />
        <FormInput
          name="address"
          type="text"
          placeholder="Address"
          defaultValue={experience?.address || ""}
          required={true}
        />
        <FormInput
          name="startDate"
          type="text"
          placeholder="Start date"
          defaultValue={experience?.startDate || ""}
          required={true}
        />
        <FormInput
          name="endDate"
          type="text"
          placeholder="endDate"
          defaultValue={experience?.endDate || ""}
        />
        <Button type="submit" form="form">
          {actionButtonText}
        </Button>
      </form>
    </>
  );
}
export default ExperienceForm;
