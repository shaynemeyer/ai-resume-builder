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
        <CardTitle>{experience.title}</CardTitle>
        <CardDescription>
          <div>{experience.company}</div>
          <div>{experience.address}</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {experience.startDate && <div>Start Date: {experience.startDate}</div>}
        {experience.endDate && <div>End Date: {experience.endDate}</div>}
        {experience.summary && <div>Summary: {parse(experience.summary)}</div>}
      </CardContent>
      <CardFooter>
        <div>
          <IconButton actionType="edit"></IconButton>
          <IconButton actionType="delete"></IconButton>
        </div>
      </CardFooter>
    </Card>
  );
}
export default ExperienceCard;
