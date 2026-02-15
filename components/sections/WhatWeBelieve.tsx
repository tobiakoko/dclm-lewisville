import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export function WhatWeBelieveSection() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl">
      <div className="mx-4 grid min-h-[calc(100vh-3.5rem)] grid-cols-1 border-x md:mx-0 md:grid-cols-5 md:border-x-0 lg:border-x">
        {/* Left Column - Introduction */}
        <div className="space-y-6 px-6 pt-16 pb-8 md:col-span-2 md:border-r md:pr-8 lg:px-12">
          <div className="space-y-4">
            <div className="inline-block">
              <span className="text-sm font-bold uppercase tracking-wider text-accent">
                Our Foundation
              </span>
            </div>
            <h2 className="font-heading text-4xl font-black md:text-5xl lg:text-6xl">
              Bible Doctrines
            </h2>
            <div className="h-1 w-20 bg-accent rounded-full" />
          </div>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-sm italic border-l-4 border-accent/30 pl-4 py-2">
              Acts 2:42; I Timothy 4:16; Titus 1:9
            </p>
            
            <p className="text-base">
              <span className="font-semibold text-foreground">&quot;Beloved,</span> when I gave all diligence to write unto you of the common salvation, 
              it was needful for me to write unto you, and exhort you that ye should{" "}
              <span className="font-semibold text-foreground">earnestly contend for the faith</span> which was once delivered unto the saints.&quot;
            </p>
            
            <p className="text-sm">
              &quot;Take heed unto thyself, and unto the doctrine; continue in them: 
              for in doing this thou shalt both save thyself, and them that hear thee.&quot;
            </p>
            
            <p className="text-sm italic">
              (Jude 3; Romans 16:17; I Timothy 4:16)
            </p>

            <div className="pt-6 mt-6 border-t border-border">
              <p className="font-semibold text-foreground text-lg mb-2">
                God&apos;s infallible WORD teaches and we believe:
              </p>
              <p className="text-sm">
                These foundational doctrines guide our faith, practice, and understanding 
                of God&apos;s Word at Deeper Life Bible Church.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Accordion */}
        <div className="md:col-span-3 md:pl-8 lg:pl-12">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto py-8 px-6">
            <Accordion collapsible type="single" className="w-full">
              {doctrines.map((item) => (
                <AccordionItem
                  className="border-b border-border last:border-b-0 data-[state=open]:bg-accent/5 transition-colors"
                  key={item.id}
                  value={item.id}
                >
                  <AccordionTrigger className="px-5 py-5 text-[15px] font-semibold leading-6 hover:no-underline hover:text-accent transition-colors">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-6 pt-2 text-muted-foreground leading-relaxed">
                    <p className="mb-3">{item.content}</p>
                    {item.scripture && (
                      <p className="text-xs italic text-muted-foreground/70 border-l-2 border-accent/30 pl-3 py-1">
                        {item.scripture}
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex h-16 items-center justify-center border-t bg-muted/30">
        <p className="text-sm text-muted-foreground">
          Questions about our beliefs?{" "}
          <Link 
            href="/contact" 
            className="font-semibold text-accent hover:text-accent/80 hover:underline transition-colors"
          >
            Contact Us
          </Link>
        </p>
      </div>
    </div>
  );
}

const doctrines = [
  {
    id: "item-1",
    title: "The Holy Bible",
    content:
      "That the Holy Bible, consisting of 39 books of the Old Testament and 27 books of the New Testament, is the inspired Word of God. We take the Bible as final authority in all matters concerning Christian conduct and work.",
    scripture: "2 Timothy 3:16,17; Proverbs 30:5,6; Revelation 22:18,19"
  },
  {
    id: "item-2",
    title: "The Godhead",
    content:
      "That the Godhead consists of three separate, distinct, and recognisable personalities and qualities, perfectly united in one. The Father, the Son, and the Holy Ghost are different Persons in the Godhead, not merely three names for one Person.",
    scripture: "Matthew 3:16,17; 2 Corinthians 13:14; Matthew 28:19,20"
  },
  {
    id: "item-3",
    title: "The Virgin Birth of Jesus",
    content:
      "The virgin birth of Jesus, the only begotten Son of God as well as His crucifixion, death, burial and bodily resurrection.",
    scripture: "Isaiah 7:14; Matthew 1:18-25; Romans 1:4; I Corinthians 15:3,4"
  },
  {
    id: "item-4",
    title: "Total Depravity, Sinfulness and Guilt of All Men",
    content:
      "The total depravity, sinfulness and guilt of all men since the Fall, rendering them subject to God's wrath and condemnation.",
    scripture: "Psalm 51:5; Job 14:4; Romans 3:23; 5:12-17; Mark 7:21-23; Ephesians 2:1"
  },
  {
    id: "item-5",
    title: "Repentance",
    content:
      "That Repentance is a complete turning away from all sins and its deceitful pleasures and that it is required from every sinner before he can truly and effectively believe in Jesus with saving faith.",
    scripture: "Proverbs 28:13; Isaiah 55:7; Ezekiel 18:21-23; Mark 1:15; Luke 24:46,47; Acts 2:38; 3:19; 20:20,21; 2 Corinthians 7:10; Hebrews 6:1-3"
  },
  {
    id: "item-6",
    title: "Restitution",
    content:
      "That Restitution is making amends for wrongs done against our fellow-men, restoring stolen things to their rightful owners, paying debts, giving back where one has defrauded, making confessions to the offended and apologizing to those slandered so as to have a conscience void of offence toward God and man.",
    scripture: "Genesis 20:1-8,14-18; Exodus 22:1-7; Leviticus 6:1-7; Numbers 5:6-8; 2 Samuel 12:1-6; Proverbs 6:30,31; Ezekiel 33:14-16; Matthew 5:23,24; Luke 19:8,9; Acts 23:1-5; 24:16; James 4:17"
  },
  {
    id: "item-7",
    title: "Justification",
    content:
      "That Justification is God's grace through which one receives forgiveness and remission of sins and is counted righteous before God, through faith in the atoning blood of Jesus. Having thus been cleared of every guilt of sin, the regenerated stands before God as though he had never sinned, not on the basis of any personal merit but in the light of what Christ had accomplished for mankind by His substitutionary death on the cross at Calvary.",
    scripture: "Psalm 32:1,2; Isaiah 1:18; Micah 7:19; Acts 13:38"
  },
  {
    id: "item-8",
    title: "Water Baptism",
    content:
      "That water Baptism is essential to our obedience after reconciliation with God. Water Baptism is one immersion (not three) 'In the name of the Father, and of the Son, and of the Holy Ghost', as Jesus commanded.",
    scripture: "Matthew 28:19; 3:13-17; Mark 16:15,16; Acts 2:38; 8:38,39; 19:1-5; Romans 6:4,5"
  },
  {
    id: "item-9",
    title: "The Lord's Supper",
    content:
      "That the Lord's supper was instituted by Jesus Christ so that all believers (all members of the family of God) might partake thereof regularly, to 'shew the Lord's death till he come'. The emblems used are 'unleavened bread' and the juice of 'fruit of the vine'. Anyone who eats and drinks unworthily brings 'damnation', punishment and chastisement upon himself.",
    scripture: "Matthew 26:29; Luke 22:17-20; I Corinthians 11:23-30"
  },
  {
    id: "item-10",
    title: "Entire Sanctification",
    content:
      "That Entire Sanctification is a definite act of God's grace, subsequent to the New Birth, by which the believer's heart is purified and made holy. It cannot be attained progressively by works, struggle or suppression, but it is obtained by faith in the sanctifying blood of Jesus Christ. Holiness of life and purity of heart are central to Christian living.",
    scripture: "Luke 1:74,75; John 17:15-17; I Thessalonians 4:3,7,8; 5:22-24; Ephesians 5:25-27; Hebrews 2:11; 10:10,14; 13:11,12; Titus 2:11-14; I John 1:7; Hebrews 12:14; I Peter 1:14-16"
  },
  {
    id: "item-11",
    title: "Holy Ghost Baptism",
    content:
      "That the Baptism in the Holy Ghost is the enduement of power from on High upon the sanctified believer. It is 'the promise of the Father' and when one receives this 'gift of the Holy Ghost', it is accompanied by the initial evidence of speaking a language unlearned previously, referred to as speaking in tongues as the Spirit gives utterance. We do not teach or instruct people how to speak in tongues: the Holy Spirit gives utterance. We also stress the necessity of purity before power. The Gifts of the Spirit are for believers today.",
    scripture: "Matthew 3:11; Acts 1:8; Luke 3:16; 24:49; John 1:30-33; 7:37-39; 14:16,17,26; 15:26; 16:12-15; Acts 1:5-8; Mark 16:17; Acts 2:1-18; 10:44-46; 19:1-6; I Corinthians 12:1-31; 14:1-40"
  },
  {
    id: "item-12",
    title: "Redemption, Healing and Health",
    content:
      "That Redemption from the curse of the law, Healing of sickness and disease as well as continued Health are provided for all people through the sacrificial death of Jesus Christ.",
    scripture: "Exodus 15:26; Deuteronomy 7:15; Psalm 103:1-5; Proverbs 4:20-22; Isaiah 53:4,5; Matthew 8:16,17; I Peter 2:24; Mark 16:15-18; Luke 13:16; John 14:12-14; 10:10; Acts 10:38; James 5:14-16; 3 John 2; Galatians 3:13,14"
  },
  {
    id: "item-13",
    title: "Personal Evangelism",
    content:
      "That Personal Evangelism is a God-given and God-ordained ministry for every believer. Jesus commanded and God requires every believer to be a compassionate and fruitful soulwinner, bringing others to Christ.",
    scripture: "Matthew 28:19,20; Mark 16:15; Luke 24:46-49; John 17:18; Acts 1:8; 1:4; Psalm 126:5,6; Proverbs 11:30; Daniel 12:3; Ezekiel 3:17-21"
  },
  {
    id: "item-14",
    title: "Marriage",
    content:
      "That Marriage is binding for life. Monogamy is the uniform teaching of the Bible. Polygamy is contrary to God's perfect will and institution. Also, under the New Testament dispensation, no one has a right to divorce and remarry while the first companion lives. When a person becomes converted, necessary restitution, on this line, must be done without delay if he has married wrongly.",
    scripture: "Genesis 2:24; Deuteronomy 7:1-4; Job 23:11-13; 2 Corinthians 6:14-18; Proverbs 31:10-31; Malachi 2:14,15; Romans 7:2,3; Ephesians 5:31-33; Matthew 5:31,32; 19:3-9; Mark 10:2-12; Luke 16:18; John 4:15-19; Genesis 20:3-7"
  },
  {
    id: "item-15",
    title: "The Rapture",
    content:
      "That the Rapture (commonly referred to as the first phase or stage of the SECOND COMING OF CHRIST) is the catching away from the earth, of all living saints and all who died in the Lord. The Rapture will take place before the Great Tribulation and can happen any time from now. 'In a twinkling of an eye' without a moment's warning, 'the trumpet shall sound' 'and the dead in Christ shall rise first; then we which are alive and remain shall be caught up together with them in the clouds, to meet the Lord in the air: and so shall we ever be with the Lord.'",
    scripture: "John 14:1-3; Luke 21:34-36; I Corinthians 15:51-58; I Thessalonians 4:13-18; 5:4-9; 2 Thessalonians 2:5-7; Philippians 3:11,20,21; I John 3:1-3"
  },
  {
    id: "item-16",
    title: "The Resurrection of The Dead",
    content:
      "That the Resurrection of the dead is taught in the Bible as clearly as the immortality of the soul. Every individual who has ever lived will be resurrected, some to honour and glory and others to everlasting shame and contempt.",
    scripture: "Job 19:25-27; Psalm 71:20; Isaiah 26:19; Daniel 12:2; John 5:28,29; I Corinthians 15:12-57; I Thessalonians 4:13-16; Hebrews 6:1,2; Philippians 3:8-11; Revelation 20:4,6,12,13"
  },
  {
    id: "item-17",
    title: "The Great Tribulation",
    content:
      "That the Great Tribulation will occur after the Rapture and will be a time of terrible suffering on earth. It is also referred to as the time of 'Jacob's trouble'. During this time, the Antichrist will take possession of this world for a reign of terror. He will not be a system or organization but a person – a supernatural, diabolical being, in the form of a man who will blaspheme and proclaim himself to be God. The Marriage Supper of the Lamb will take place above while the Tribulation continues on earth.",
    scripture: "Matthew 24:21,22,29; Revelation 9:16; Mark 13:19; 2 Thessalonians 2:3-12; Revelation 13; Daniel 8:23-25; 2 Thessalonians 2:7-12; Revelation 13:1-10; 19:1-10"
  },
  {
    id: "item-18",
    title: "The Second Coming of Christ",
    content:
      "That the Second Coming of Christ will be just as literal and visible as His going away, and He is coming to execute judgement upon the ungodly. He will also, then, set up His Kingdom and reign on this present earth for a thousand years.",
    scripture: "Zechariah 14:3,4; Matthew 25:31-46; 26:64; Mark 13:24-37; 2 Thessalonians 1:7-10; 2:8; Jude 14,15"
  },
  {
    id: "item-19",
    title: "Christ's Millennial Reign",
    content:
      "That Christ's Millennial Reign is the 1,000 years literal reign of Jesus on earth, which will be ushered in by the coming of Jesus back to earth with ten thousands of His saints. At this time He will judge the nations that dwell upon the face of the earth. During this time, the devil will be bound. It will be a reign of peace and blessing.",
    scripture: "Jude 14,15; 2 Thessalonians 1:7-10; Revelation 20:2,3; Isaiah 11:6-9; 65:25; Hosea 2:18; Zechariah 14:9-20; Isaiah 2:2-4"
  },
  {
    id: "item-20",
    title: "The Great White Throne Judgement",
    content:
      "That the Great White Throne Judgement is when God finally judges all (the living and the dead, small and great) who have ever lived on the face of the earth, according to their works. This is after the Millennium. At this time, the final Judgement known as the Great White Throne Judgement will be held. All those, from all ages, who have not yet been judged (believers' judgement for sin, borne and accomplished by Christ on the Cross) will stand before God at this time. The devil and his angels are judged at this time also and sent to the lake of fire forever.",
    scripture: "John 5:24; 3:17-19; Daniel 12:2,3; Matthew 10:15; 11:21-24; 12:41,42; John 5:28,29; Romans 2:15,16; 14:12; 2 Peter 2:9; Jude 6; I Corinthians 6:1-4; Acts 10:42; Revelation 20:11-15"
  },
  {
    id: "item-21",
    title: "The New Heaven and The New Earth",
    content:
      "That the New Heaven and the New Earth 'wherein dwelleth righteousness' will be made by God and the redeemed shall dwell therein with God forever. This present earth which has been polluted by sin will pass away after the Great White Throne Judgement. No unclean thing will be there. There, we shall know each other, our knowledge having been perfected. There will be no more curse upon anything. There will be no more night; the glory of the Lord will be the light thereof.",
    scripture: "Psalm 102:25,26; Isaiah 51:6; 65:17; Matthew 5:18; 24:35; 2 Peter 3:10-13; Revelation 21:1; Isaiah 66:22; 2 Peter 3:12,13; I Corinthians 13:12; I John 3:2,3; Revelation 21:1-7; 22:1-5"
  },
  {
    id: "item-22",
    title: "Hell",
    content:
      "That Hell fire is a place of everlasting punishment where sinners (all who do not have their names in the book of life) will suffer torments for ever and ever. It was prepared for the devil and his angels (Matthew 25:41) but God has decreed that the wicked and those who forget Him and reject Christ will also be cast there because of their sin and neglect of His salvation.",
    scripture: "Psalm 9:17; Matthew 25:46; Luke 12:4,5; 16:19-31; Matthew 5:22,30; Mark 9:43-47; Revelation 14:10,11; 20:10,12,15"
  },
];