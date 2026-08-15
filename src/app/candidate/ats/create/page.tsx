// src/app/candidate/ats/create/page.tsx
"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { User, Phone, Mail, Linkedin, MapPin, GraduationCap, Briefcase, Star, PlusCircle, Trash2, Eye, FileText } from 'lucide-react'

// Define types for resume sections
interface Education { id: number; institution: string; degree: string; year: string }
interface Experience { id: number; company: string; role: string; duration: string; description: string }
interface Project { id: number; name: string; description: string }
interface Skill { id: number; name: string }

export default function CreateResumePage() {
  const [name, setName] = useState('John Doe')
  const [phone, setPhone] = useState('+1 234 567 890')
  const [email, setEmail] = useState('john.doe@example.com')
  const [linkedin, setLinkedin] = useState('linkedin.com/in/johndoe')
  const [location, setLocation] = useState('San Francisco, CA')

  const [education, setEducation] = useState<Education[]>([{ id: 1, institution: 'State University', degree: 'B.Sc. in Computer Science', year: '2020' }])
  const [experience, setExperience] = useState<Experience[]>([{ id: 1, company: 'Tech Corp', role: 'Software Engineer', duration: '2020 - Present', description: 'Developed and maintained web applications.' }])
  const [projects, setProjects] = useState<Project[]>([{ id: 1, name: 'Personal Portfolio', description: 'A personal website to showcase my projects.' }])
  const [skills, setSkills] = useState<Skill[]>([{ id: 1, name: 'JavaScript' }, { id: 2, name: 'React' }])
  
  const [activeTemplate, setActiveTemplate] = useState('modern')

  // Functions to add/remove items from sections
  const addEducation = () => setEducation([...education, { id: Date.now(), institution: '', degree: '', year: '' }])
  const removeEducation = (id: number) => setEducation(education.filter(e => e.id !== id))
  
  const addExperience = () => setExperience([...experience, { id: Date.now(), company: '', role: '', duration: '', description: '' }])
  const removeExperience = (id: number) => setExperience(experience.filter(e => e.id !== id))

  const addProject = () => setProjects([...projects, { id: Date.now(), name: '', description: '' }])
  const removeProject = (id: number) => setProjects(projects.filter(p => p.id !== id))

  const addSkill = () => setSkills([...skills, { id: Date.now(), name: '' }])
  const removeSkill = (id: number) => setSkills(skills.filter(s => s.id !== id))


  return (
    <div className="p-6 h-full flex flex-col md:flex-row gap-6 overflow-hidden">
      {/* Editor Panel */}
      <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Resume Editor</h1>
          <div className="overflow-y-auto pr-4 flex-grow">
            <Card>
                <CardHeader><CardTitle>Personal Details</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Full Name</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
                        <div className="space-y-2"><Label>Phone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} /></div>
                        <div className="space-y-2"><Label>Email</Label><Input value={email} onChange={e => setEmail(e.target.value)} /></div>
                        <div className="space-y-2"><Label>LinkedIn</Label><Input value={linkedin} onChange={e => setLinkedin(e.target.value)} /></div>
                    </div>
                     <div className="space-y-2"><Label>Location</Label><Input value={location} onChange={e => setLocation(e.target.value)} /></div>
                </CardContent>
            </Card>

            <Separator className="my-6" />

            {/* Education Section */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Education</CardTitle>
                    <Button variant="outline" size="sm" onClick={addEducation}><PlusCircle className="h-4 w-4 mr-2" />Add</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {education.map((edu, index) => (
                        <div key={edu.id} className="p-4 border rounded-md relative">
                            <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="Institution" value={edu.institution} onChange={e => setEducation(education.map(item => item.id === edu.id ? { ...item, institution: e.target.value } : item))} />
                                <Input placeholder="Degree" value={edu.degree} onChange={e => setEducation(education.map(item => item.id === edu.id ? { ...item, degree: e.target.value } : item))} />
                                <Input placeholder="Year" value={edu.year} onChange={e => setEducation(education.map(item => item.id === edu.id ? { ...item, year: e.target.value } : item))} />
                            </div>
                            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEducation(edu.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Separator className="my-6" />

            {/* Work Experience Section */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Work Experience</CardTitle>
                    <Button variant="outline" size="sm" onClick={addExperience}><PlusCircle className="h-4 w-4 mr-2" />Add</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {experience.map(exp => (
                        <div key={exp.id} className="p-4 border rounded-md relative space-y-2">
                             <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="Company" value={exp.company} onChange={e => setExperience(experience.map(item => item.id === exp.id ? { ...item, company: e.target.value } : item))} />
                                <Input placeholder="Role" value={exp.role} onChange={e => setExperience(experience.map(item => item.id === exp.id ? { ...item, role: e.target.value } : item))} />
                                <Input placeholder="Duration (e.g., 2020 - Present)" value={exp.duration} onChange={e => setExperience(experience.map(item => item.id === exp.id ? { ...item, duration: e.target.value } : item))} />
                             </div>
                             <Textarea placeholder="Description..." value={exp.description} onChange={e => setExperience(experience.map(item => item.id === exp.id ? { ...item, description: e.target.value } : item))} />
                             <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExperience(exp.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Separator className="my-6" />

            {/* Skills & Projects can be added similarly */}
            
        </div>
      </div>
      
      {/* Preview Panel */}
      <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Preview</h1>
            <div className="flex gap-2">
                <Button variant={activeTemplate === 'modern' ? 'default' : 'outline'} size="sm" onClick={() => setActiveTemplate('modern')}>Modern</Button>
                <Button variant={activeTemplate === 'classic' ? 'default' : 'outline'} size="sm" onClick={() => setActiveTemplate('classic')}>Classic</Button>
            </div>
          </div>
        <div className="overflow-y-auto border rounded-lg p-6 bg-background flex-grow">
          {/* Resume Template */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-1">{name}</h1>
                <div className="text-muted-foreground flex justify-center gap-4 text-xs">
                    <span>{phone}</span> | <span>{email}</span> | <span>{linkedin}</span> | <span>{location}</span>
                </div>
            </header>
            <main>
                <section className="mb-4">
                    <h2 className="text-lg font-semibold border-b pb-1 mb-2">Education</h2>
                    {education.map(edu => (
                        <div key={edu.id} className="mb-2">
                            <div className="flex justify-between">
                                <h3 className="font-semibold">{edu.institution}</h3>
                                <p className="text-muted-foreground">{edu.year}</p>
                            </div>
                            <p>{edu.degree}</p>
                        </div>
                    ))}
                </section>
                <section>
                    <h2 className="text-lg font-semibold border-b pb-1 mb-2">Work Experience</h2>
                    {experience.map(exp => (
                         <div key={exp.id} className="mb-2">
                            <div className="flex justify-between">
                                <h3 className="font-semibold">{exp.company}</h3>
                                <p className="text-muted-foreground">{exp.duration}</p>
                            </div>
                            <p className="italic">{exp.role}</p>
                            <p className="text-muted-foreground text-sm">{exp.description}</p>
                        </div>
                    ))}
                </section>
                 {/* Skills & Projects to be rendered here */}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}