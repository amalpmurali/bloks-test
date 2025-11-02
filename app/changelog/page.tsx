import React from "react";
import { Changelog, type ChangelogItem } from "@/components/common/changelog";

// Sample changelog data
const changelogData: ChangelogItem[] = [
  {
    version: "v1.3.0",
    versionSubtext: "Major Feature Release",
    date: "10-03-2025 14:30",
    title: "Feature Request Dialog",
    description:
      "Added new feature request functionality with image upload capabilities.",
    featureImages: [
      {
        url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
        caption: "Feature request dialog with rich text editor"
      },
      {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        caption: "Image upload functionality"
      },
      {
        url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        caption: "Brutalist design elements"
      }
    ],
    contributors: [
      {
        name: "Sarah Chen",
        avatar: "https://i.pravatar.cc/150?u=sarah"
      },
      {
        name: "Alex Johnson",
        avatar: "https://i.pravatar.cc/150?u=alex"
      },
      {
        name: "Rahul Sharma",
        avatar: "https://i.pravatar.cc/150?u=rahul"
      }
    ],
    isHighlighted: true,
    changes: [
      {
        type: "added",
        items: [
          "Feature request dialog component with brutalist design",
          "Rich text editor for feature descriptions",
          "Image upload with drag and drop functionality",
          "Sanskrit quotes from Bhagavad Gita for inspiration",
        ],
      },
      {
        type: "changed",
        items: [
          "Improved dialog component to use ScrollArea for better overflow handling",
          "Enhanced button designs with hover effects",
        ],
      },
    ],
  },
  {
    version: "v1.2.5",
    versionSubtext: "UI Enhancement",
    date: "05-03-2025 09:45",
    title: "Login Form Redesign",
    description: "Revamped the login form with a brutalist design aesthetic.",
    featureImages: [
      {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        caption: "Redesigned login form"
      },
      {
        url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        caption: "Brutalist illustrations"
      }
    ],
    contributors: [
      {
        name: "Maya Patel",
        avatar: "https://i.pravatar.cc/150?u=maya"
      },
      {
        name: "Chris Wong",
        avatar: "https://i.pravatar.cc/150?u=chris"
      }
    ],
    changes: [
      {
        type: "changed",
        items: [
          "Redesigned login form with brutalist elements",
          "Replaced social login buttons with Bhagavad Gita quotations",
          "Added custom brutalist illustrations",
        ],
      },
      {
        type: "removed",
        items: [
          "Removed conventional social login options",
          "Eliminated rounded corners and shadows for sharper edges",
        ],
      },
    ],
  },
  {
    version: "v1.2.0",
    versionSubtext: "Component Updates",
    date: "28-02-2025 11:20",
    title: "Component Library Update",
    description:
      "Major updates to our component library with new primitives and improved accessibility.",
    changes: [
      {
        type: "added",
        items: [
          "New geometric shape primitives for brutalist designs",
          "Custom typography components with monospace options",
          "Utility functions for creating offset shadows",
        ],
      },
      {
        type: "fixed",
        items: [
          "Improved keyboard navigation across all components",
          "Fixed contrast issues in dark mode",
          "Resolved layout shifts in responsive views",
        ],
      },
    ],
  },
  {
    version: "v1.1.0",
    versionSubtext: "Initial Release",
    date: "15-02-2025 08:00",
    title: "Initial Design System",
    description: "Launched the first version of our brutalist design system.",
    changes: [
      {
        type: "added",
        items: [
          "Core UI components with brutalist styling",
          "Custom color palette with high contrast options",
          "Typography system based on monospace fonts",
          "Layout primitives for grid-based designs",
        ],
      },
    ],
  },
  // New dummy entries to demonstrate pagination
  {
    version: "v1.0.5",
    versionSubtext: "Bug Fix",
    date: "05-02-2025 14:30",
    title: "Performance Improvements",
    description: "Fixed critical performance issues and improved loading times.",
    featureImages: [
      {
        url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        caption: "Performance analytics dashboard"
      }
    ],
    contributors: [
      {
        name: "Tanya Rodriguez",
        avatar: "https://i.pravatar.cc/150?u=tanya"
      }
    ],
    changes: [
      {
        type: "fixed",
        items: [
          "Reduced initial load time by 40%",
          "Fixed memory leaks in image processing",
          "Improved caching mechanisms"
        ],
      },
    ],
  },
  {
    version: "v1.0.4",
    versionSubtext: "Enhancement",
    date: "01-02-2025 10:15",
    title: "Accessibility Update",
    description: "Major accessibility improvements across all components.",
    contributors: [
      {
        name: "Jordan Lee",
        avatar: "https://i.pravatar.cc/150?u=jordan"
      },
      {
        name: "Priya Kumar",
        avatar: "https://i.pravatar.cc/150?u=priya"
      }
    ],
    changes: [
      {
        type: "changed",
        items: [
          "Enhanced keyboard navigation",
          "Improved screen reader compatibility",
          "Added high contrast mode"
        ],
      },
      {
        type: "added",
        items: [
          "Focus indicators for all interactive elements",
          "ARIA labels for complex components"
        ],
      },
    ],
  },
  {
    version: "v1.0.3",
    versionSubtext: "Feature",
    date: "25-01-2025 09:30",
    title: "Search Functionality",
    description: "Added global search with custom brutalist styling.",
    featureImages: [
      {
        url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        caption: "Search interface with brutalist design"
      }
    ],
    changes: [
      {
        type: "added",
        items: [
          "Global search component",
          "Search results with highlighting",
          "Keyboard shortcuts for quick access"
        ],
      },
    ],
  },
  {
    version: "v1.0.2",
    versionSubtext: "Update",
    date: "20-01-2025 16:45",
    title: "Documentation Update",
    description: "Comprehensive documentation update with new examples.",
    changes: [
      {
        type: "added",
        items: [
          "Interactive component playground",
          "Code snippet generator",
          "Dark mode documentation theme"
        ],
      },
      {
        type: "changed",
        items: [
          "Reorganized component categories",
          "Improved API documentation"
        ],
      },
    ],
  },
  {
    version: "v1.0.1",
    versionSubtext: "Patch",
    date: "15-01-2025 11:20",
    title: "Initial Bugfixes",
    description: "Fixed issues reported after initial release.",
    contributors: [
      {
        name: "Sam Wilson",
        avatar: "https://i.pravatar.cc/150?u=sam"
      }
    ],
    changes: [
      {
        type: "fixed",
        items: [
          "Resolved form submission errors",
          "Fixed layout issues on mobile devices",
          "Corrected text overflow in buttons"
        ],
      },
    ],
  },
  {
    version: "v1.0.0",
    versionSubtext: "Initial Release",
    date: "10-01-2025 08:00",
    title: "Official Launch",
    description: "First official release of our brutalist design system.",
    featureImages: [
      {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        caption: "Official launch event"
      }
    ],
    isHighlighted: true,
    changes: [
      {
        type: "added",
        items: [
          "Complete component library",
          "Responsive layout system",
          "Custom icon set",
          "Brutalist color palettes"
        ],
      },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="container mx-auto pt-28 pb-12 px-4">
      {" "}
      {/* Added pt-28 to account for fixed navbar */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-mono font-bold mb-4 relative inline-block">
            <span className="relative z-10">CHANGELOG</span>
            <div className="absolute -left-2 -bottom-1 w-full h-3 bg-yellow-400 z-0"></div>
          </h1>
          <p className="text-xl max-w-2xl">
            Track the evolution of our brutalist design system and component
            library. Each release brings new geometric possibilities and
            expressive contrasts.
          </p>
        </div>

        <Changelog items={changelogData} />
      </div>
    </div>
  );
}
