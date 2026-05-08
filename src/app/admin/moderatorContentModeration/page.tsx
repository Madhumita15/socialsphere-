
'use client'
import React from 'react'


import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const moderationCards = [
  {
    id: 1,
    title: "Cyber Harassment Case",
    description: "User reported inappropriate comments targeting another member of the community.",
    reportType: "Harassment",
    reportColor: "border-red-500/50 text-red-400",
    priority: "High Priority",
    priorityColor: "bg-orange-500",
    reporter: "John Doe",
    reporterSeed: "1",
  },
  {
    id: 2,
    title: "Spam Content Report",
    description: "Multiple users reported spam links in this post promoting external services.",
    reportType: "Spam",
    reportColor: "border-blue-500/50 text-blue-400",
    priority: "Normal Priority",
    priorityColor: "bg-gray-500",
    reporter: "Sarah Anderson",
    reporterSeed: "2",
  },
  {
    id: 3,
    title: "Explicit Content Review",
    description: "Post contains explicit material flagged by automatic detection system.",
    reportType: "Explicit",
    reportColor: "border-pink-500/50 text-pink-400",
    priority: "Critical",
    priorityColor: "bg-red-500",
    reporter: "Mike Patterson",
    reporterSeed: "3",
  },
]

const ModeratorContentModeration = () => {
  return (
    <>
    <div className="min-h-screen bg-[#151515] text-white">
      {/* Main Container */}
      <div className="flex">
        {/* Left Sidebar - Filters */}
        <div className="w-64 bg-black border-r border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-6">Filters</h2>

          {/* Priority Level Section */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-400 mb-4">Priority Level</h3>
            <div className="space-y-2">
              <Button variant="destructive" className="w-full justify-start gap-3 border-gray-700 text-white">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm">Critical</span>
              </Button>
              <Button variant="destructive" className="w-full justify-start gap-3 border-gray-700 text-white">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm">High</span>
              </Button>
              <Button variant="destructive" className="w-full justify-start gap-3 border-gray-700 text-white">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <span className="text-sm">Normal</span>
              </Button>
            </div>
          </div>

          {/* Report Type Section */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-400 mb-4">Report Type</h3>
            <div className="space-y-3">
              <Button variant="default" className="w-full justify-center rounded-2xl border-purple-300 text-white">All Types</Button>
              <Button variant="default" className="w-full justify-center rounded-2xl border-purple-300 text-white">Spam</Button>
              <Button variant="default" className="w-full justify-center rounded-2xl border-purple-300 text-white">Harassment</Button>
              <Button variant="default" className="w-full justify-center rounded-2xl border-purple-300 text-white">Explicit Content</Button>
            </div>
          </div>

          {/* Progress Section */}
          <div className="border-t border-gray-800 pt-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-4">Progress</h3>
            <p className="text-sm text-gray-300 mb-3">Resolved 24 cases</p>
            <Progress value={60}  className="h-2 " />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Moderation Queue</h1>
            <p className="text-gray-400">Displaying pending reports requiring attention</p>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-6">
            {moderationCards.map((card) => (
              <Card key={card.id} className="bg-black border border-gray-800 p-6 hover:border-purple-500 transition-colors">
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-24 h-24 bg-gray-800 rounded-lg shrink-0"></div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-[#D493FF]">{card.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{card.description}</p>

                    {/* Badges */}
                    <div className="flex gap-2 mb-4">
                      <Badge variant="outline" className={`${card.reportColor}`}>
                        {card.reportType}
                      </Badge>
                      <div className="flex items-center gap-2 px-2 py-1 border border-gray-700 rounded text-sm">
                        <div className={`w-2 h-2 rounded-full ${card.priorityColor}`}></div>
                        <span className='text-red-600'>{card.priority}</span>
                      </div>
                    </div>

                    {/* Reporter Info */}
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={`/images/profile.png=${card.reporterSeed}`} />
                        <AvatarFallback>{card.reporter.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>Reported by {card.reporter}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button variant="ghost" className="text-sm border-gray-700 text-white">View Details</Button>
                      <Button className="bg-red-600 hover:bg-red-700 text-white text-sm">Remove</Button>
                      <Button variant="destructive" className="text-sm border-gray-700 text-white">Keep</Button>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm">Mark Trending</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ModeratorContentModeration