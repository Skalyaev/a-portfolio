import { useState } from "react"

import { RootMe } from "@/components/svg/RootMe"
import { HackTheBox } from "@/components/svg/HackTheBox"

import { useLanguage } from "@/lib/hooks/useLanguage"

import { hackTheBoxProfile } from "@/constants/skills/hackthebox"
import { rootMeProfile } from "@/constants/skills/rootme"

import { SkillsSection } from "../SkillsSection"
import { ProfileCard } from "./ProfileCard"
import { ProgressBar } from "./ProgressBar"
import { StatTile } from "./StatTile"
import { ActivityList } from "./ActivityList"

import type { CyberSecurityData } from "../../_lib/getCyberSecurity"

const htbAcademyUrl = "https://academy.hackthebox.com/"

export interface CyberSecuritySectionProps {
  cyberSecurity: CyberSecurityData
}
export function CyberSecuritySection({
  cyberSecurity
}: CyberSecuritySectionProps) {
  const { t } = useLanguage()
  const { htb, rootMe } = cyberSecurity

  const [selectedRootMeCategories, setSelectedRootMeCategories] = useState<
    string[]
  >([])
  const [selectedHtbCategories, setSelectedHtbCategories] = useState<
    string[]
  >([])

  function toggleRootMeCategory(name: string) {
    setSelectedRootMeCategories((current) =>
      current.includes(name)
        ? current.filter((category) => category !== name)
        : [...current, name]
    )
  }
  function toggleHtbCategory(name: string) {
    setSelectedHtbCategories((current) =>
      current.includes(name)
        ? current.filter((category) => category !== name)
        : [...current, name]
    )
  }

  const sortedRootMeCategories = [...rootMe.categories].sort(
    (a, b) => b.percent - a.percent
  )
  const rootMeSolvedChallenges = (
    selectedRootMeCategories.length > 0
      ? rootMe.categories.filter((category) =>
          selectedRootMeCategories.includes(category.name)
        )
      : rootMe.categories
  ).flatMap((category) =>
    category.solvedChallenges.map((challenge) => ({
      name: challenge.name,
      url: challenge.url
    }))
  )
  const sortedHtbChallengeCategories = htb.profile
    ? [...htb.challengeStats.categories].sort((a, b) => b.percent - a.percent)
    : []
  const htbSolvedChallenges =
    selectedHtbCategories.length > 0
      ? htb.solvedChallenges.filter(
          (challenge) =>
            challenge.category &&
            selectedHtbCategories.includes(challenge.category)
        )
      : htb.solvedChallenges

  return (
    <SkillsSection
      className="gap-4 pb-6"
      title={t("skills.cybersecurity.title")}
      subtitle={t("skills.cybersecurity.subtitle")}>
      <ProfileCard
        icon={
          <RootMe
            width={20}
            height={20}
          />
        }
        title={rootMeProfile.name}
        href={rootMeProfile.profileUrl}
        viewProfileLabel={t("skills.cybersecurity.viewProfile")}
        description={t("skills.cybersecurity.rootme.description")}
        left={
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <StatTile
                label={t("skills.cybersecurity.points")}
                value={String(rootMe.score)}
              />
              <StatTile
                label={t("skills.cybersecurity.rootme.solved")}
                value={`${rootMe.challengesSolved} / ${rootMe.challengesTotal}`}
              />
              <StatTile
                label={t("skills.cybersecurity.rootme.categories")}
                value={String(rootMe.categories.length)}
              />
            </div>
            <div className="flex flex-col gap-2">
              {sortedRootMeCategories.map((category) => (
                <ProgressBar
                  key={category.name}
                  name={category.name}
                  url={category.url}
                  solved={category.solved}
                  total={category.total}
                  percent={category.percent}
                  dimmed={
                    selectedRootMeCategories.length > 0 &&
                    !selectedRootMeCategories.includes(category.name)
                  }
                  onToggle={() => toggleRootMeCategory(category.name)}
                />
              ))}
            </div>
          </div>
        }
        right={
          <ActivityList
            label={t("skills.cybersecurity.rootme.solved")}
            items={rootMeSolvedChallenges}
          />
        }
      />

      <ProfileCard
        icon={
          <HackTheBox
            width={20}
            height={20}
          />
        }
        title={t("skills.cybersecurity.academy.title")}
        href={htbAcademyUrl}
        viewProfileLabel={t("skills.cybersecurity.viewProfile")}
        description={t("skills.cybersecurity.academy.description")}
        left={
          <StatTile
            label={t("skills.cybersecurity.academy.modules")}
            value={String(htb.academyModules.length)}
          />
        }
        right={
          <ActivityList
            label={t("skills.cybersecurity.academy.modules")}
            items={htb.academyModules}
          />
        }
      />

      <ProfileCard
        icon={
          <HackTheBox
            width={20}
            height={20}
          />
        }
        title={hackTheBoxProfile.name}
        href={hackTheBoxProfile.profileUrl}
        viewProfileLabel={t("skills.cybersecurity.viewProfile")}
        description={t("skills.cybersecurity.htb.description")}
        left={
          htb.profile && (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <StatTile
                  label={htb.profile.rankName || t("skills.cybersecurity.rank")}
                  value={
                    htb.profile.globalRank ? `#${htb.profile.globalRank}` : "—"
                  }
                />
                <StatTile
                  label={t("skills.cybersecurity.points")}
                  value={String(htb.profile.points)}
                />
                <StatTile
                  label={t("skills.cybersecurity.htb.userOwns")}
                  value={String(htb.profile.userOwns)}
                />
                <StatTile
                  label={t("skills.cybersecurity.htb.systemOwns")}
                  value={String(htb.profile.systemOwns)}
                />
                <StatTile
                  label={t("skills.cybersecurity.htb.challengesSolved")}
                  value={`${htb.challengeStats.solved} / ${htb.challengeStats.total}`}
                />
                <StatTile
                  label={t("skills.cybersecurity.htb.machinesSolved")}
                  value={`${htb.machineStats.solved} / ${htb.machineStats.total}`}
                />
              </div>
              <div className="flex flex-col gap-2">
                {sortedHtbChallengeCategories.map((category) => (
                  <ProgressBar
                    key={category.name}
                    name={category.name}
                    solved={category.solved}
                    total={category.total}
                    percent={category.percent}
                    dimmed={
                      selectedHtbCategories.length > 0 &&
                      !selectedHtbCategories.includes(category.name)
                    }
                    onToggle={() => toggleHtbCategory(category.name)}
                  />
                ))}
              </div>
            </div>
          )
        }
        right={
          htb.profile && (
            <div className="flex flex-col gap-3">
              <ActivityList
                label={t("skills.cybersecurity.htb.machines")}
                items={htb.completedMachines}
              />
              <ActivityList
                label={t("skills.cybersecurity.htb.challenges")}
                items={htbSolvedChallenges}
              />
            </div>
          )
        }
      />
    </SkillsSection>
  )
}
