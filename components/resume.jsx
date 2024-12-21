"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDownloadLink, Page, Text, View, Image, Document, StyleSheet } from "@react-pdf/renderer";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCogs, FaUserAlt, FaStar } from "react-icons/fa";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

// Define PDF styles
const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    color: "#333",
  },
  sidebar: {
    backgroundColor: "#333333",
    padding: 20,
    width: "30%",
    color: "#FFFFFF",
  },
  profileImage: {
    marginBottom: 20,
    height: 80,
    width: 80,
    borderRadius: "50%",
    alignSelf: "center",
    backgroundColor: "#666",
    objectFit: "cover",
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  sidebarItem: {
    fontSize: 10,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  sidebarIcon: {
    marginRight: 5,
  },
  mainContent: {
    padding: 30,
    width: "70%",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4A90E2",
  },
  paragraph: {
    fontSize: 10,
    color: "#555",
  },
  starRating: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  skillItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  mainSkills:{
    marginTop:20,

  }
});

// Skills data for star rating
const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

const steps = [
  { title: "Personal Information", fields: ["name", "email", "phone", "address", "image"] },
  { title: "Summary", fields: ["summary"] },
  { title: "Education", fields: ["degree", "university", "graduationYear"] },
  { title: "Experience", fields: ["jobTitle", "company", "duration", "jobDescription"] },
  { title: "Skills", fields: ["skills"] },
  { title: "Projects", fields: ["projectTitle", "projectDescription"] },
];

const ResumePDF = ({ formData }) => (
  <Document>
    <Page style={pdfStyles.page}>
      {/* Sidebar */}
      <View style={pdfStyles.sidebar}>
        {formData.image && (
          <Image src={formData.image} style={pdfStyles.profileImage} />
        )}
        <Text style={pdfStyles.sidebarTitle}>CONTACT</Text>
        <View style={pdfStyles.sidebarItem}>
          <FaPhoneAlt style={pdfStyles.sidebarIcon} />
          <Text>{formData.phone || "+123-456-7890"}</Text>
        </View>
        <View style={pdfStyles.sidebarItem}>
          <FaEnvelope style={pdfStyles.sidebarIcon} />
          <Text>{formData.email || "you@email.com"}</Text>
        </View>
        <View style={pdfStyles.sidebarItem}>
          <FaMapMarkerAlt style={pdfStyles.sidebarIcon} />
          <Text>{formData.address || "123 Anywhere, Any City"}</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={pdfStyles.mainContent}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          {formData.name || "Your Name"}
        </Text>
        <Text style={pdfStyles.sectionTitle}>ABOUT MYSELF</Text>
        <Text style={pdfStyles.paragraph}>
          {formData.summary ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
        </Text>

        {/* Skills */}<View style={pdfStyles.mainSkills}>
        <Text style={pdfStyles.sectionTitle}>SKILLS</Text>
        {formData.skills &&
          formData.skills.map((skill, index) => (
            <View key={index} style={pdfStyles.skillItem}>
              <Text>{skill.name}</Text>
              <View style={pdfStyles.starRating}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < skill.proficiency ? "#FFD700" : "#ccc"}
                  />
                ))}
              </View>
            </View>
          ))}
</View>
        {/* Experience */}<View style={pdfStyles.mainSkills}>
        <Text style={pdfStyles.sectionTitle}>EXPERIENCE</Text>
        {formData.experience?.map((exp, index) => (
          <View key={index}>
            <Text style={pdfStyles.paragraph}>
              <strong>{exp.jobTitle}</strong> at <strong>{exp.company}</strong> ({exp.duration})
            </Text>
            <Text style={pdfStyles.paragraph}>{exp.jobDescription}</Text>
          </View>
        ))}
</View>
        {/* Education */}<View style={pdfStyles.mainSkills}>
        <Text style={pdfStyles.sectionTitle}>EDUCATION</Text>
        {formData.education?.map((edu, index) => (
          <View key={index}>
            <Text style={pdfStyles.paragraph}>
              <strong>{edu.degree}</strong> from <strong>{edu.university}</strong> ({edu.graduationYear})
            </Text>
          </View>
        ))}
</View><View style={pdfStyles.mainSkills}>
        {/* Projects */}
        <Text style={pdfStyles.sectionTitle}>PROJECTS</Text>
        {formData.projects?.map((project, index) => (
          <View key={index}>
            <Text style={pdfStyles.paragraph}>
              <strong>{project.projectTitle}</strong>
            </Text>
            <Text style={pdfStyles.paragraph}>{project.projectDescription}</Text>
          </View>
        ))}
      </View>
      </View>
    </Page>
  </Document>
);

const ResumeForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const currentStep = steps[step];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...(formData.skills || [])];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setFormData((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...(formData.experience || [])];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setFormData((prev) => ({ ...prev, experience: updatedExperience }));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...(formData.education || [])];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setFormData((prev) => ({ ...prev, education: updatedEducation }));
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...(formData.projects || [])];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setFormData((prev) => ({ ...prev, projects: updatedProjects }));
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div className="p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{currentStep.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep.fields.map((field) => (
            <div key={field} className="mb-4">
              <Label htmlFor={field} className="mb-2 capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </Label>
              {field === "image" ? (
                <div className="space-y-2">
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed p-4 text-center"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="profile preview"
                        className="w-32 h-32 rounded-full mx-auto"
                      />
                    ) : (
                      <p>Drag & drop an image here, or click to select one</p>
                    )}
                    <input {...getInputProps()} />
                  </div>
                </div>
              ) : field === "skills" ? (
                <>
                  {(formData.skills || []).map((skill, index) => (
                    <div key={index} className="mb-4 flex justify-between">
                      <Input
                        value={skill.name}
                        onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                        placeholder="Enter skill name"
                        className="w-full mr-2"
                      />
                      <Select
                        value={skill.proficiency || "1"}
                        onChange={(e) => handleSkillChange(index, "proficiency", e.target.value)}
                      >
                        <option value="1">Beginner</option>
                        <option value="2">Intermediate</option>
                        <option value="3">Advanced</option>
                        <option value="4">Expert</option>
                      </Select>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => setFormData((prev) => ({
                      ...prev,
                      skills: [...(prev.skills || []), { name: "", proficiency: 1 }],
                    }))}
                  >
                    Add Skill
                  </Button>
                </>
              ) : (
                <Textarea
                  id={field}
                  value={formData[field] || ""}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  placeholder={`Enter your ${field.replace(/([A-Z])/g, " $1")}`}
                  className="w-full"
                />
              )}
            </div>
          ))}
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 0}>
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep(step + 1)}>Next</Button>
            ) : (
              <PDFDownloadLink
                document={<ResumePDF formData={formData} />}
                fileName={`${formData.name || "resume"}.pdf`}
              >
                {({ loading }) =>
                  loading ? (
                    <Button variant="default" disabled>
                      Generating PDF...
                    </Button>
                  ) : (
                    <Button variant="default">Download PDF</Button>
                  )
                }
              </PDFDownloadLink>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeForm;
