import { createSkill, getSkillFromDb, updateSkill } from "@/actions/skills";
import { Skill, skillLevels } from "@/types/skill";
import React from "react";
import FormInput from "../form/FormInput";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { Popover } from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillFormProps {
  resumeId?: number;
  skillId?: number;
  actionButtonText?: string;
  closeAction?: React.Dispatch<React.SetStateAction<boolean>>;
  setSkillList?: React.Dispatch<React.SetStateAction<Skill[]>>;
}

const initSkill: Skill = {
  name: "",
  level: "",
};

function SkillForm({
  resumeId = 0,
  skillId = 0,
  closeAction,
  setSkillList,
}: SkillFormProps) {
  const [loading, setLoading] = React.useState(false);
  const [skill, setSkill] = React.useState<Skill>(initSkill);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (resumeId && skillId === 0) {
      console.log("Create skill");
      const result = await createSkill({
        ...skill,
        resumeId: resumeId,
      });
      console.log(`skill created: ${result}`);
      toast({ description: "Skill has been created" });
    } else {
      console.log("Update skill");
      const result = await updateSkill(skill);
      console.log(`skill updated: ${result}`);
      toast({ description: "Skill has been updated" });
    }

    if (closeAction) closeAction(false);
  };

  React.useEffect(() => {
    async function fetchSkill() {
      if (skillId) {
        const data = await getSkillFromDb(skillId);
        if (data) {
          setSkill(data as Skill);
        }
      }
    }
    fetchSkill();
  }, [skillId]);

  return (
    <>
      <form onSubmit={handleSubmit} id="form">
        <FormInput
          name="name"
          type="text"
          placeholder="Skill name"
          defaultValue={skill?.name || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSkill({ ...skill, name: e.target.value })
          }
          required={true}
        />
        {/* <FormInput
          name="level"
          type="text"
          placeholder="Level"
          defaultValue={skill?.level || ""}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSkill({ ...skill, level: e.target.value })
          }
        /> */}
        <div className="mb-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-[200px] justify-between",
                  !skill.level && "text-muted-foreground"
                )}
              >
                {skill.level
                  ? skillLevels.find(
                      (sk) => sk.value.toString() === skill.level
                    )?.label
                  : "Select skill level"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search level..." />
                <CommandList>
                  <CommandEmpty>No skill level found.</CommandEmpty>
                  <CommandGroup>
                    {skillLevels.map((skillOption) => (
                      <CommandItem
                        value={skillOption.label}
                        key={skillOption.value}
                        onSelect={() => {
                          setSkill({
                            ...skill,
                            level: skillOption.value.toString(),
                          });
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            skillOption.value.toString() === skill.level
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {skillOption.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Button type="submit" form="form">
          {skillId === 0 ? "Save" : "Update"}
        </Button>
      </form>
    </>
  );
}
export default SkillForm;
