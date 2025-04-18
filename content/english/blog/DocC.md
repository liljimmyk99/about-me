---
title: "Utilizing Code Documentation Comments"
meta_title: ""
description: ""
date: 2025-04-17T21:00:00Z
image: "/images/CodeDocumentation.png"
categories: ["How Tos"]
author: "Jimmy Kane"
tags: ["Swift", "CI/CD"]
draft: false
---

## Why should I care?

Imagine getting ready to work on or use a new dependency/tool, what do they all have in common?  A README file which gives pertinent information about the library in question. How detailed that README is, that depends greatly on the developer/team in question.  Some APIs/CLIs have a `--help` flag you can pass in and get instructions that way, however that requires installing the tool and even then it may not be super detailed.  The next elevation from a simple README is a code documentation site such as [oh-my-zsh](https://ohmyz.sh/), [Tuist](https://docs.tuist.dev/en/), and event [React](https://react.dev/).

Documentation websites allow developers to be verbose in their code documentation, which gives end-users the most amount of detail possible about the library.  There becomes a problem though, in my use case my team are Mobile App Developers and Website Development isn't super our specialty nor would it be easy to get approval from Product or Engineering Manager.  We would need a way to somehow generate a website with the least amount of effort and code, preferably without maintaining the under-the-hood HTML/CS/JS.  

## A Previous solution

Way back in the Java glory days, you were able to turn code comments into a static website for every class as well as functions and attributes in set class.  The problem? The website is ugly and a bit dated & the format of the website was pretty locked down.  Many years later in the modern world there are static site generators that only require the editing of markdown files (_***cough cough*** what I am using for this very website_), however the underlying HTML/CSS/JS would still need to be maintained in the repo of whatever your CLI tool is.  The solution is to combine these two ideas, code comments and mark down files to generate a website.  For iOS developers like me, Apple has created a SDK called [Swift DocC](https://www.swift.org/documentation/docc/) during [WWDC 2023](https://developer.apple.com/videos/play/wwdc2023/10244) which accomplishes just that!

## The new way forward

Swift DocC allows you to use documentation comments (`///`) on public structures & classes as well as markdown files in a [Documentation Catalog](https://www.swift.org/documentation/docc/adding-supplemental-content-to-a-documentation-catalog) to create a "Apple esk" website as well as tool tips inside of XCode!  These comments can be multi-line or single line as long as exist the line directly above the struct, class, or variable within a struct/class.  

### Limitations to note

When implementing the documentation website for my teams' component library there were a few limitations I was unaware of to start that are worth noting.  If you extend a core struct like `SwiftUI/View` or `Foundation` these comments will not show up in a documentation website but **WILL** in tool tips inside of XCode.  A workaround I did was to create a Supplemental [Article](https://www.swift.org/documentation/docc/adding-supplemental-content-to-a-documentation-catalog) page and link this page to the landing page.  This was a prospective-user is able to navigate to this structure/documentation without needing to open XCode.

Another issue was the desire to document `private` and `protected` classes/structs and sadly this is not possible.  The workaround is the same as above but it can be frustrating when you are unable to find the documentation for a struct you know exists.

There are probably other issues out there that may conflict with your specific use-case, but in mine to document a Mobile Component Library these were the only two we ran into.

### Example Inline Comment
```swift
    public struct SomeConfigStruct {
    /// **Optional** A button to be shown to the left of the title
    public var startingAction: Button?
    /// A button to be shown to the right of the title
    public var endingAction: Button
    /// String to shown in the top center of the screen
    public var title: String

    /// Values to be presented in the screen header
    ///
    /// ## Example
    ///
    /// ```swift
    /// SomeConfigStruct(
    ///     startingAction: Button(),
    ///     endingAction:  Button(),
    ///     title: "Some title here"
    /// )
    /// ```
    ///
    /// - Parameters:
    ///   - startingAction: *Optional** A button to be shown to the left of the title
    ///   - endingAction: A button to be shown to the right of the title
    ///   - title: String to shown in the top center of the screen
    public init(startingAction: Button? = nil, endingAction: Button, title: String) {
        self.startingAction = startingAction
        self.endingAction = endingAction
        self.title = title
    }
```

## Example Extension File
```md
# ``NameOfPackage/SpecificPublicStruct``

## Some Header

Some body that discusses the value of `SpecificPublicStruct` and what it does

## Another Header that describes code

```swift
VStack {
// content
}
.SpecificPublicStruct(Color.Orange)
```

