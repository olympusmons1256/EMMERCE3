import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const BadgePopover = ({ type, options, onSelect }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-8 border-dashed">
          Add {type}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Select {type}</h4>
            <p className="text-sm text-muted-foreground">
              Choose a {type} to add to your description.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {options.map((option) => (
              <Badge
                key={option}
                variant="outline"
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                onClick={() => onSelect(option)}
              >
                {option}
              </Badge>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BadgePopover;