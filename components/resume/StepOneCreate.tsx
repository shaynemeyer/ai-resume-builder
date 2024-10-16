"use client";

import { Resume } from "@/types/resume";

import React from "react";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Button";
import FormInput from "../form/FormInput";
import { createResumeAction } from "@/actions/resume";

interface StepOneCreateProps {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

function StepOneCreate({ resume, setResume }: StepOneCreateProps) {
  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Personal Information</h2>

      {resume && (
        <FormContainer action={createResumeAction}>
          <FormInput
            name="name"
            type="text"
            placeholder="Your name"
            defaultValue={resume.name}
            onChange={(event) => {
              setResume({ ...resume, name: event.target.value });
            }}
          />
          <FormInput
            name="job"
            type="text"
            placeholder="Job title"
            defaultValue={resume.job || ""}
            onChange={(event) => {
              setResume({ ...resume, job: event.target.value });
            }}
          />
          <FormInput
            name="address"
            type="text"
            placeholder="Address"
            defaultValue={resume.address || ""}
            onChange={(event) => {
              setResume({ ...resume, address: event.target.value });
            }}
          />
          <FormInput
            name="phone"
            type="text"
            placeholder="Phone number"
            defaultValue={resume.phone || ""}
            onChange={(event) => {
              setResume({ ...resume, phone: event.target.value });
            }}
          />
          <FormInput
            name="email"
            type="email"
            placeholder="Email address"
            defaultValue={resume.email}
            onChange={(event) => {
              setResume({ ...resume, email: event.target.value });
            }}
          />
          <div className="flex justify-end">
            <SubmitButton text="Save" size="sm" />
          </div>
        </FormContainer>
      )}
    </div>
  );
}
export default StepOneCreate;
