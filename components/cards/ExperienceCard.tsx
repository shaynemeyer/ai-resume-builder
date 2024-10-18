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
        {experience.startDate && <div>{experience.startDate}</div>}
        {experience.endDate && <div>{experience.endDate}</div>}
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
