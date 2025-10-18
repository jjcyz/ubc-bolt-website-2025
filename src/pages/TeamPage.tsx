import React, { useState, useEffect } from "react";
import { TeamData, Team as TeamType, Member } from "../types";
import { getProfileUrl } from "../lib/assets";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";

// Import with type assertion for JSON data
import teamDataJson from "../data/team.json";
const teamData = teamDataJson as unknown as TeamData;

const TeamPage: React.FC = () => {
  const [expandedYear, setExpandedYear] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get leadership team and separate presidents from VPs
  const leadershipTeam = teamData.teams.find(team => team.team_name === "Leadership");
  const presidents = leadershipTeam?.executives.filter(exec =>
    exec.title.toLowerCase().includes("president")
  ) || [];
  const vps = leadershipTeam?.executives.filter(exec =>
    !exec.title.toLowerCase().includes("president")
  ) || [];

  // Get all other teams except leadership and advising
  const otherTeams = teamData.teams.filter(team =>
    team.team_name !== "Leadership" && team.team_name !== "Advising"
  );

  // Get advising team separately to place at bottom
  const advisingTeam = teamData.teams.find(team => team.team_name === "Advising");

  const renderMemberCard = (member: Member, isLeadership: boolean = false) => {
    return (
      <div
        key={`${member.name}-${member.title}`}
        className="flex flex-col items-center pb-9 w-48"
      >
        {/* Profile Picture */}
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-400 mb-1.5 shadow-[0_0_15px_rgba(168,85,247,0.4),0_0_30px_rgba(236,72,153,0.2)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6),0_0_40px_rgba(236,72,153,0.4),0_0_60px_rgba(59,130,246,0.3)] hover:scale-110 transition-all duration-300 hover:-translate-y-1">
          <img
            src={getProfileUrl(member.profilepic || '')}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <h3 className="font-inter text-xs font-bold text-gray-900 text-center mb-0.5 leading-tight">
          {member.name}
        </h3>

        {/* Title */}
        <p className="font-inter text-[11px] text-gray-600 text-center mb-1.5 leading-tight">
          {member.title}
        </p>

        {/* LinkedIn Icon - Always shown */}
        {member.linkedin ? (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-1 text-purple-600 hover:text-purple-800 transition-colors"
            aria-label={`${member.name}'s LinkedIn`}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        ) : (
          <div className="mb-1 text-gray-400">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
        )}

        {/* Emails for Leadership - Club email first, then personal */}
        {isLeadership && (member.personalEmail || member.clubEmail) && (
          <div className="flex flex-col gap-1 w-full mt-1">
            {member.clubEmail && (
              <a
                href={`mailto:${member.clubEmail}`}
                className="text-xs text-gray-900 hover:text-gray-600 text-center transition-colors break-all"
              >
                {member.clubEmail}
              </a>
            )}
            {member.personalEmail && (
              <a
                href={`mailto:${member.personalEmail}`}
                className="text-xs text-gray-900 hover:text-gray-600 text-center transition-colors break-all"
              >
                {member.personalEmail}
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderTeamSection = (team: TeamType, isLeadership: boolean = false) => {
    return (
      <section key={team.team_name} className="mb-8">
        <h2 className="font-inter text-base font-bold text-gray-900 mb-8 text-center">
          {team.team_name}
        </h2>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-12 max-w-[1400px] mx-auto">
          {team.executives.map(member => renderMemberCard(member, isLeadership))}
        </div>
      </section>
    );
  };

  const renderPastMemberCard = (member: Member) => {
    return (
      <div
        key={`${member.name}-${member.title}`}
        className="flex flex-col items-center text-center w-52"
      >
        {/* Name */}
        <h3 className="font-inter text-xs font-bold text-gray-900 mb-0.5 leading-tight">
          {member.name}
        </h3>

        {/* Title */}
        <p className="font-inter text-[11px] text-gray-600 leading-tight">
          {member.title}
        </p>
      </div>
    );
  };

  const renderPastExecutives = () => {
    const years = Object.keys(teamData.pastExecutives).sort().reverse();

    return (
      <section className="mb-8">
        <h2 className="font-inter text-base font-bold text-gray-900 mb-8 text-center">
          Past Executives
        </h2>

        {years.map(year => {
          const executives = teamData.pastExecutives[year];
          const isExpanded = expandedYear === year;

          return (
            <div key={year} className="mb-3">
              {/* Expandable Bar */}
              <button
                onClick={() => setExpandedYear(isExpanded ? null : year)}
                className="w-full bg-gray-100 hover:bg-gray-200 transition-colors py-2 px-4 rounded-lg flex justify-between items-center border border-gray-300"
              >
                <span className="font-inter text-sm font-semibold text-gray-900">
                  {year} Team
                </span>
                <svg
                  className={`w-4 h-4 text-gray-900 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded Content */}
              {isExpanded && executives.length > 0 && (
                <div className="mt-3 p-4 bg-white rounded-lg border border-gray-300">
                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-6">
                    {executives.map(member => renderPastMemberCard(member))}
                  </div>
                </div>
              )}

              {isExpanded && executives.length === 0 && (
                <div className="mt-3 p-4 bg-white rounded-lg border border-gray-300">
                  <p className="text-center text-gray-500 font-inter text-sm">No past executives recorded for this year yet.</p>
                </div>
              )}
            </div>
          );
        })}
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar with better visibility */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-6">
            <h1 className="font-inter text-2xl font-bold text-gray-900 mb-1">
              Our Team
            </h1>
            <p className="font-inter text-xs text-gray-600">
              Meet the dedicated members who make BOLT possible
            </p>
          </div>

          {/* Leadership Section - Presidents First */}
          {presidents.length > 0 && (
            <section className="mb-8">
              <h2 className="font-inter text-base font-bold text-gray-900 mb-8 text-center">
                Leadership
              </h2>

              {/* Presidents Row */}
              <div className="flex justify-center gap-6 mb-4">
                {presidents.map(member => renderMemberCard(member, true))}
              </div>

              {/* VPs Grid */}
              {vps.length > 0 && (
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-12 max-w-[1400px] mx-auto">
                  {vps.map(member => renderMemberCard(member, true))}
                </div>
              )}
            </section>
          )}

          {/* Other Teams (except Advising) */}
          {otherTeams.map(team => renderTeamSection(team))}

          {/* Advising Section - At Bottom */}
          {advisingTeam && renderTeamSection(advisingTeam)}

          {/* Past Executives - Expandable */}
          {renderPastExecutives()}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TeamPage;
