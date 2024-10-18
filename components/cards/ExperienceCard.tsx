import { Experience } from "@/types/experience";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { IconButton } from "../form/Button";
import parse from "html-react-parser";

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <div>{experience.title}</div>

          <div>
            <IconButton
              actionType="edit"
              className="p-0 "
              onClick={() => console.log("edit experience")}
            ></IconButton>
            <IconButton
              actionType="delete"
              onClick={() => console.log("delete experience")}
            ></IconButton>
          </div>
        </CardTitle>
        <CardDescription>
          <div>{experience.company}</div>
          <div className="text-xs">{experience.address}</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {experience.startDate && (
          <div className="mb-4">Start Date: {experience.startDate}</div>
        )}
        {experience.endDate && <div>End Date: {experience.endDate}</div>}
        {experience.summary && <div>Summary: {parse(experience.summary)}</div>}
      </CardContent>
    </Card>
  );
}
export default ExperienceCard;
