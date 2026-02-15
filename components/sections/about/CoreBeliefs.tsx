'use client'

import { useState } from 'react'
import {
  BookOpen,
  Church,
  Heart,
  Sparkles,
  Baby,
  RotateCcw,
  Scale,
  Droplets,
  Wine,
  Flame,
  Cross,
  Stethoscope,
  Megaphone,
  Users,
  Cloud,
  Sunrise,
  AlertTriangle,
  Crown,
  Gavel,
  Sun,
  CircleOff,
  type LucideIcon,
} from 'lucide-react'
import { BIBLE_DOCTRINES, type Doctrine } from '@/lib/constants'
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalDescription,
} from '@/components/ui/modal'

interface Belief {
  id: number
  icon: LucideIcon
  title: string
  description: string
  references: string
}

const beliefs: Belief[] = [
  { id: 1, icon: BookOpen, title: 'The Holy Bible', description: 'We believe that the Holy Bible is the inspired, infallible and authoritative Word of God.', references: '2 Tim. 3:16; 2 Pet. 1:20-21' },
  { id: 2, icon: Church, title: 'The Godhead', description: 'We believe in the unity of the Godhead and the trinity of the persons therein – Father, Son and Holy Spirit.', references: 'Gen. 1:26; Matt. 3:16-17; 28:19' },
  { id: 3, icon: Baby, title: 'Virgin Birth', description: 'We believe in the Virgin Birth, Sinless Life, Atoning Death, Triumphant Resurrection, Ascension and Abiding Intercession of our Lord Jesus Christ and His Second Coming, the hope of believers.', references: 'Isa. 7:14; Matt. 1:18-25; Heb. 4:14-15; 9:12; Acts 1:9-11; 1 Thess. 4:16-17' },
  { id: 4, icon: Heart, title: "Man's Depravity", description: 'We believe in the fall and depravity of man who can be saved only through the merits of Jesus Christ.', references: 'Rom. 3:23; 5:12; Acts 4:12' },
  { id: 5, icon: RotateCcw, title: 'Repentance', description: 'We believe in Salvation through repentance towards God and faith in the Lord Jesus Christ.', references: 'Acts 20:21; Rom. 10:9-10; Eph. 2:8-9' },
  { id: 6, icon: Scale, title: 'Restitution', description: 'We believe in Restitution – making amends for wrongs done against our fellow men: giving back things wrongfully taken, or their equivalent and payment of debts and restoration wherever possible.', references: 'Lev. 6:2-5; Ezek. 33:14-16; Luke 19:8' },
  { id: 7, icon: Cross, title: 'Justification', description: 'We believe in Justification by faith in the Lord Jesus Christ.', references: 'Rom. 4:5; 5:1; Gal. 2:16' },
  { id: 8, icon: Droplets, title: 'Water Baptism', description: 'We believe in Water Baptism by immersion, in the Name of the Father, of the Son and of the Holy Spirit.', references: 'Matt. 28:19; Acts 2:38; Rom. 6:3-4' },
  { id: 9, icon: Wine, title: "The Lord's Supper", description: "We believe in the Sacrament of the Lord's Supper for believers in Christ.", references: '1 Cor. 11:23-26; Luke 22:14-20' },
  { id: 10, icon: Sparkles, title: 'Sanctification', description: 'We believe in Sanctification as a second definite but instantaneous work of grace, obtainable by faith on the part of the regenerated.', references: '1 Thess. 4:3; 5:23; Heb. 13:12' },
  { id: 11, icon: Flame, title: 'Holy Ghost Baptism', description: 'We believe in the Baptism of the Holy Ghost for believers with the evidence of speaking in tongues.', references: 'Acts 1:8; 2:4; 10:44-46' },
  { id: 12, icon: Stethoscope, title: 'Redemption from Sickness', description: 'We believe that our redemption from sickness and disease has been provided for in the atonement.', references: 'Isa. 53:4-5; Matt. 8:17; 1 Pet. 2:24' },
  { id: 13, icon: Megaphone, title: 'Personal Evangelism', description: 'We believe in Personal Evangelism and soul winning as the supreme task of the Church. All Christians should give public witness to the Gospel through personal word, consistent walk and by earnest contending for the faith once delivered unto the saints.', references: 'Mark 16:15; Acts 1:8; Jude 3' },
  { id: 14, icon: Users, title: 'Marriage & Home', description: 'We believe in Marriage as an institution of God and that the home should be a place of true piety where children should be brought up in the fear and admonition of the Lord.', references: 'Gen. 2:24; Eph. 5:22-33; 6:1-4' },
  { id: 15, icon: Cloud, title: 'The Rapture', description: 'We believe in the Rapture of the saints at the Second Coming of Christ when all believers both dead and living shall rise to meet the Lord in the air.', references: '1 Thess. 4:16-17; 1 Cor. 15:51-52' },
  { id: 16, icon: Sunrise, title: 'Resurrection', description: 'We believe in the Resurrection of both the saved and the lost, the saved to everlasting life and the lost to everlasting damnation.', references: 'John 5:28-29; Rev. 20:11-15' },
  { id: 17, icon: AlertTriangle, title: 'The Great Tribulation', description: 'We believe in the Great Tribulation which will occur after the Rapture of the saints, during which there will be terrible judgments from God upon the wicked and apostate.', references: 'Matt. 24:21; Rev. 7:14; 2 Thess. 2:3-12' },
  { id: 18, icon: Crown, title: 'Second Coming of Christ', description: 'We believe in the Personal, Bodily and Glorious Second Coming of our Lord Jesus Christ to establish His Millennial Kingdom on earth.', references: 'Acts 1:11; Rev. 19:11-16; Zech. 14:4' },
  { id: 19, icon: Church, title: 'Millennial Reign', description: 'We believe in the 1000 years reign of Christ on earth with His saints, the New Jerusalem serving as the headquarters.', references: 'Rev. 20:4-6; 21:1-2' },
  { id: 20, icon: Gavel, title: 'White Throne Judgement', description: 'We believe in the Great White Throne Judgement when the wicked dead shall be resurrected and judged according to their works.', references: 'Rev. 20:11-15' },
  { id: 21, icon: Sun, title: 'New Heaven & Earth', description: 'We believe in the New Heaven and New Earth where righteousness dwells forever.', references: '2 Pet. 3:13; Rev. 21:1-4' },
  { id: 22, icon: CircleOff, title: 'Hell', description: 'We believe in the reality of Hell – a place of eternal torment and separation from God for those who reject Christ.', references: 'Matt. 25:46; Mark 9:43-48; Rev. 20:14-15' },
]

export default function CoreBeliefs() {
  const [selectedDoctrine, setSelectedDoctrine] = useState<Doctrine | null>(null)

  function handleBeliefClick(beliefId: number) {
    const doctrine = BIBLE_DOCTRINES.find((d) => d.id === `item-${beliefId}`)
    if (doctrine) {
      setSelectedDoctrine(doctrine)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beliefs.map((belief) => {
          const Icon = belief.icon
          return (
            <article
              key={belief.id}
              onClick={() => handleBeliefClick(belief.id)}
              className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-(--church-red)/20 transition-all duration-300 relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-(--church-red) via-(--church-red)/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <header className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-(--church-navy)/5 text-(--church-navy) flex items-center justify-center shrink-0 group-hover:bg-(--church-red) group-hover:text-white transition-colors duration-300">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-xs font-bold text-(--church-red)/60 uppercase tracking-wider">
                    Tenet {belief.id}
                  </span>
                  <h3 className="font-bold text-lg text-(--church-navy) group-hover:text-(--church-red) transition-colors leading-tight">
                    {belief.title}
                  </h3>
                </div>
              </header>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {belief.description}
              </p>

              <footer className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs text-slate-400 font-medium">
                  <span className="text-(--church-navy)/70 font-semibold">References:</span>{' '}
                  {belief.references}
                </p>
                <span className="text-xs font-semibold text-(--church-red) opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-2">
                  Read more
                </span>
              </footer>
            </article>
          )
        })}
      </div>

      <Modal open={!!selectedDoctrine} onOpenChange={(open) => !open && setSelectedDoctrine(null)}>
        <ModalContent className="max-h-[85vh] overflow-y-auto">
          {selectedDoctrine && (
            <>
              <div className="mb-1">
                <span className="text-xs font-bold text-(--church-red)/60 uppercase tracking-wider">
                  Tenet {selectedDoctrine.id.replace('item-', '')}
                </span>
              </div>
              <ModalTitle className="font-serif text-xl text-(--church-navy) mb-4">
                {selectedDoctrine.title}
              </ModalTitle>
              <ModalDescription asChild>
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedDoctrine.content}
                  </p>
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-400 font-medium">
                      <span className="text-(--church-navy)/70 font-semibold">Scripture References:</span>{' '}
                      {selectedDoctrine.scripture}
                    </p>
                  </div>
                </div>
              </ModalDescription>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
