---
title: "Why create a Developer Style Guide?"
meta_title: ""
description: ""
date: 2026-06-19T11:00:00Z
image: "/images/StyleGuide.jpg"
categories: ["Documentation"]
author: "Jimmy Kane"
tags: ["Swift", "CI/CD", "AI"]
draft: false
---

## What is a Style Guide
Style Guides are commonplace to those in the Branding/Marketing, Product Design, UI/UX Design spaces.  [Figma](https://www.figma.com/resource-library/what-is-a-style-guide/), a UI/UX Tool company describes it as something that "maintains brand consistency and coherence".  Utilizing a guide gives directions to designers of "how to use brand elements, including fonts, typography, logo, color palette, and imagery."  [Purdue OWL](https://owl.purdue.edu/owl/avoiding_plagiarism/guide_overview%20.html), a resource used by many students across the country to understand APA & MLA format rules, has a slightly different explanation of a style guide as "everything a writer needs to know in order to make their work look and read just like every other work written in that style".

## How does this make sense for a software engineer?
In two different contexts, design and writing, the guide set a standard that was to be kept by the entire team.  Why couldn't a software create a guide for a team to keep!  To an extent there is an element of a style guide in use today in two different ways.  First via the formatter.  Prettier has a config file that many organizations and individuals make adjustments to based on their preference.  Secondly, it is often unspoken but developers have preferences for structuring API Calls, Functional vs Class Components, Error Handling, Logging, Logic Branching (Switch vs If/Else-If).  All these unspoken preferences, that make their way into PR comments, is exactly what a Developer Style Guide looks like!

## OK that makes sense, how is it applicable?
For my team at Ford Credit, my onboarding was a little rough.  The documentation for all the software I needed was outdated, configuration files for my local environment didn't exist in a central place an engineer had to open his terminal to give me his config settings that way, and the codebase itself had little to no documentation describing what folder contained what, or how I was expected to write code.  I seem to be one of the few Software Engineers out there who loves to program but also write documentation so I have been writing down everything a new Engineer needs to get started without needing to be reliant on another person.

Assuming an a new member to your team can get their environment set up and can get moving through the codebase, a very helpful piece of information for them to see is how your codes.  There are many frameworks, conventions, and patterns to do nearly anything but it is not sustainable for a codebase to do the same thing 5 different ways.  If a new engineer can see the agreed upon approach for API calls, Error Handling, Logging, Tests, etc. not only will that help them understand the existing codebase but will help them contribute meaningful work that much faster

## Of course, AI was going to be mentioned!
You didn't think there would be a blog post in 2026 that didn't mention AI right? I will be honest, I understand that many developers and teams do not care for documentation.  It takes time to write and can be easily outdated thus only meeting minutes, architecture diagrams, and other non-changing information is typically written down.  Wait a second, doesn't that sound a lot like a style guide?  I would say yes.  However, some organizations may think it is a waste to have a developer or two spend a sprint writing down standards and getting the team to agree to them.  Well I have a solution for you, _**✨AI Token Optimization✨**_.

Who said that these standards had to be written in a Microsoft Word document or Confluence; they can written in a Markdown file so that GitHub Co-Pilot, Cursor, or another AI tool can take them in as Instructions or as a Skill.  If this is passed as instruction, the agent will not need to search your entire codebase to get a sense for your coding style but will instead utilize this file, saving time and tokens.  Additionally, any code that the LLM generates will already be conformed to your teams preference and will result in less human changes before a PR can be raised.

In my teams experience we have a very detailed & human-focused, document in Confluence that has examples and rationales for how to do nearly anything: Testing, Analytics, Navigation, Atomization, Inline Closures, and more.  This document was then stripped down to just having example code & lists of Dos & Don'ts.  Depending on your specific AI tool it might make sense to split your standards into separate files/agents & have more/less explanation of what you want done.  

Utilizing the instruction and agent files is very much a trial and error effort, if the agent is not producing the results you expect you can always ask `Why did you do this?  Does the instruction files not mention to do Y?` .  My team has even asked Cursor, our AI tool of choice, `Are there any gaps in your understanding of our codebase?` and it gave us a list and we just created agent files to fill in that gap.

However, before you can even get to the AI Agent file stage, your team needs to come together and agree on how code should be written and thus you are in a sense writing a developer style guide by accident, why not just make it human readable?