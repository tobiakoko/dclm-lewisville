'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Heart, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface MenuItem {
  name: string
  href: string
  description?: string
  items?: MenuItem[]
}

const menuItems: MenuItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'About',
    href: '/about',
    items: [
      {
        name: 'Our Story',
        href: '/about',
        description: 'Learn about our history and mission',
      },
      {
        name: 'Our Team',
        href: '/about#team',
        description: 'Meet our pastors and leaders',
      },
      {
        name: 'Beliefs',
        href: '/about#beliefs',
        description: 'What we believe and teach',
      },
    ],
  },
  {
    name: 'Ministries',
    href: '/ministries',
    items: [
      {
        name: 'All Ministries',
        href: '/ministries',
        description: 'Explore all our ministries',
      },
      {
        name: "Children's Ministry",
        href: '/ministries#children',
        description: 'Ministry for kids and families',
      },
      {
        name: 'Youth Ministry',
        href: '/ministries#youth',
        description: 'Connecting teens to Christ',
      },
      {
        name: "Women's Ministry",
        href: '/ministries#women',
        description: 'Empowering women in faith',
      },
    ],
  },
  { name: 'Sermons', href: '/sermons' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' },
]

export default function ModernNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white ${
        scrolled
          ? 'shadow-md border-b-2 border-secondary'
          : 'border-b border-gray-200'
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 bg-primary flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/90">
            <Heart className="w-6 h-6 text-white" fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl font-bold text-primary">
              DCLM Lewisville
            </span>
            <span className="text-xs text-gray-600 hidden sm:block">
              Deeper Christian Life Ministry
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => {
                if (item.items && item.items.length > 0) {
                  return (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuTrigger className="text-sm font-medium uppercase">
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4">
                          {item.items.map((subItem) => (
                            <li key={subItem.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href}
                                  className="block select-none space-y-1  p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-semibold leading-none">
                                    {subItem.name}
                                  </div>
                                  {subItem.description && (
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                      {subItem.description}
                                    </p>
                                  )}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                }

                return (
                  <NavigationMenuItem key={item.name}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center  bg-background px-4 py-2 text-sm font-medium uppercase transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <Button
            asChild
            className="ml-4 bg-secondary hover:bg-secondary/90 text-white transition-all duration-300"
          >
            <Link href="/give">
              <Heart className="w-4 h-4 mr-2" />
              Give
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-primary" />
                ) : (
                  <Menu className="h-6 w-6 text-primary" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center space-x-3" onClick={() => setMobileMenuOpen(false)}>
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary  flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" fill="currentColor" />
                    </div>
                    <span className="font-heading text-lg font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                      DCLM Lewisville
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8">
                <Accordion type="single" collapsible className="w-full">
                  {menuItems.map((item, index) => {
                    if (item.items && item.items.length > 0) {
                      return (
                        <AccordionItem key={item.name} value={`item-${index}`} className="border-b">
                          <AccordionTrigger className="text-base font-semibold uppercase hover:no-underline py-4">
                            {item.name}
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 pb-4">
                              {item.items.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    className="block py-2 px-4 text-sm  hover:bg-accent transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <div className="font-medium">{subItem.name}</div>
                                    {subItem.description && (
                                      <div className="text-xs text-muted-foreground mt-1">
                                        {subItem.description}
                                      </div>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    }

                    return (
                      <div key={item.name} className="border-b">
                        <Link
                          href={item.href}
                          className="block py-4 text-base font-semibold uppercase hover:text-primary transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </div>
                    )
                  })}
                </Accordion>

                <div className="mt-6">
                  <Button asChild className="w-full bg-gradient-to-r from-primary to-primary">
                    <Link href="/give" onClick={() => setMobileMenuOpen(false)}>
                      <Heart className="w-4 h-4 mr-2" />
                      Give
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
