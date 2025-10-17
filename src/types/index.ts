/**
 * Type definitions for BOLT UBC website data structures
 */

/**
 * Represents a team member/executive
 */
export interface Member {
  /** Full name of the team member */
  name: string;
  /** Position/role title */
  title: string;
  /** Filename of the profile picture (stored in /public/profiles/) */
  profilepic: string;
}

/**
 * Represents a team within the organization
 */
export interface Team {
  /** Name of the team (e.g., "Marketing", "Development") */
  team_name: string;
  /** Array of executives in this team */
  executives: Member[];
}

/**
 * Root structure for team data (team.json)
 */
export interface TeamData {
  /** Array of all teams in the organization */
  teams: Team[];
}

/**
 * Represents an event hosted by BOLT
 */
export interface Event {
  /** Event name */
  name: string;
  /** Event description */
  description: string;
  /** Filename of the event image (stored in /public/events/) */
  image: string;
}

/**
 * Root structure for events data (events.json)
 */
export interface EventsData {
  /** Array of all events */
  events: Event[];
  /** Index of the next upcoming event */
  nextEvent: number;
}

/**
 * Common component props
 */

/**
 * Props for button components
 */
export interface ButtonProps {
  /** Button text content */
  text: string;
  /** Click handler function */
  onClick: () => void;
  /** Use outline variant style */
  outline?: boolean;
  /** Use rounded corners */
  rounded?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Disable the button */
  disabled?: boolean;
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Props for section components
 */
export interface SectionProps {
  /** HTML id for navigation/anchoring */
  id: string;
  /** Child elements */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

