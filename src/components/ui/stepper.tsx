"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { defineStepper } from "@stepperize/react";

export interface StepperStep {
    id: string;
    title: string;
    description: string;
    render: (step: StepperStep) => React.ReactNode;
}

interface StepperProps {
    steps: StepperStep[];
    initialStepId?: string;
    onComplete?: () => void;
}

export function Stepper({ steps, initialStepId, onComplete }: StepperProps) {
    const { useStepper, utils } = defineStepper(
        ...steps.map(({ id, title, description }) => ({
            id,
            title,
            description,
        })),
    );
    const stepper = useStepper({ initialStep: initialStepId });

    const currentIndex = utils.getIndex(stepper.current.id);

    return (
        <div>
            <nav aria-label="Steps Navigation" className="group my-4">
                <ol className="flex items-center justify-center gap-2">
                    {stepper.all.map((step, index, array) => (
                        <React.Fragment key={step.id}>
                            <li className="flex items-center gap-4">
                                <Button
                                    type="button"
                                    variant={
                                        index <= currentIndex
                                            ? "default"
                                            : "secondary"
                                    }
                                    aria-current={
                                        stepper.current.id === step.id
                                            ? "step"
                                            : undefined
                                    }
                                    aria-posinset={index + 1}
                                    aria-setsize={steps.length}
                                    aria-selected={
                                        stepper.current.id === step.id
                                    }
                                    onClick={() => stepper.goTo(step.id)}
                                    className="flex size-10 items-center justify-center rounded-full"
                                >
                                    {index + 1}
                                </Button>
                                <span className="text-sm font-medium">
                                    {step.title}
                                </span>
                            </li>
                            {index < array.length - 1 && (
                                <Separator
                                    className={`w-32 ${index < currentIndex ? "bg-primary" : "bg-muted"}`}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </ol>
            </nav>
            <Separator className="my-4" />
            <div className="space-y-4">
                {stepper.switch(
                    steps.reduce(
                        (acc, step) => ({
                            ...acc,
                            [step.id]: () => step.render(step),
                        }),
                        {},
                    ),
                )}
                <div className="flex justify-end gap-4">
                    <Button
                        variant="secondary"
                        onClick={stepper.prev}
                        disabled={stepper.isFirst}
                    >
                        Back
                    </Button>
                    <Button
                        onClick={() => {
                            if (stepper.isLast) {
                                onComplete?.();
                            } else {
                                stepper.next();
                            }
                        }}
                    >
                        {stepper.isLast ? "Complete" : "Next"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
