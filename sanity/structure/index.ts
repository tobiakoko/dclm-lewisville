import type {StructureResolver} from 'sanity/structure'
import {CogIcon, DocumentsIcon, UsersIcon, CalendarIcon, DocumentTextIcon, BookIcon, HeartIcon, PlayIcon, UserIcon, HomeIcon} from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Site Settings - Singleton at the top
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      S.divider(),

      // Homepage Sections
      S.listItem()
        .title('Homepage Sections')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Homepage Sections')
            .items([
              S.listItem()
                .title('Hero Carousel')
                .icon(HomeIcon)
                .child(
                  S.document()
                    .schemaType('homeSection')
                    .documentId('heroCarousel')
                    .title('Hero Carousel')
                ),

              S.listItem()
                .title('Pastor Welcome')
                .child(
                  S.document()
                    .schemaType('homeSection')
                    .documentId('pastorWelcome')
                    .title('Pastor Welcome')
                ),

              S.listItem()
                .title('Give Section')
                .child(
                  S.document()
                    .schemaType('homeSection')
                    .documentId('giveSection')
                    .title('Give Section')
                ),

              S.listItem()
                .title('CTA Section')
                .child(
                  S.document()
                    .schemaType('homeSection')
                    .documentId('ctaSection')
                    .title('CTA Section')
                ),
            ])
        ),

      S.divider(),

      // Sermons & Series
      S.listItem()
        .title('Sermons & Series')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Sermons & Series')
            .items([
              S.listItem()
                .title('All Sermons')
                .icon(PlayIcon)
                .child(
                  S.documentTypeList('sermon')
                    .title('All Sermons')
                    .defaultOrdering([{field: 'date', direction: 'desc'}])
                ),

              S.listItem()
                .title('Featured Sermons')
                .icon(PlayIcon)
                .child(
                  S.documentTypeList('sermon')
                    .title('Featured Sermons')
                    .filter('_type == "sermon" && featured == true')
                    .defaultOrdering([{field: 'date', direction: 'desc'}])
                ),

              S.divider(),

              S.listItem()
                .title('Sermon Series')
                .child(S.documentTypeList('series').title('Sermon Series')),

              S.listItem()
                .title('Sermons by Series')
                .child(
                  S.documentTypeList('series')
                    .title('Select a Series')
                    .child(seriesId =>
                      S.documentList()
                        .title('Sermons in Series')
                        .filter('_type == "sermon" && series._ref == $seriesId')
                        .params({seriesId})
                        .defaultOrdering([{field: 'date', direction: 'desc'}])
                    )
                ),
            ])
        ),

      S.divider(),

      // Events
      S.listItem()
        .title('Events')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Events')
            .items([
              S.listItem()
                .title('Upcoming Events')
                .icon(CalendarIcon)
                .child(
                  S.documentTypeList('event')
                    .title('Upcoming Events')
                    .filter('_type == "event" && dateTime(date) >= dateTime(now())')
                    .defaultOrdering([{field: 'date', direction: 'asc'}])
                ),

              S.listItem()
                .title('Featured Events')
                .icon(CalendarIcon)
                .child(
                  S.documentTypeList('event')
                    .title('Featured Events')
                    .filter('_type == "event" && featured == true')
                    .defaultOrdering([{field: 'date', direction: 'desc'}])
                ),

              S.listItem()
                .title('Past Events')
                .child(
                  S.documentTypeList('event')
                    .title('Past Events')
                    .filter('_type == "event" && dateTime(date) < dateTime(now())')
                    .defaultOrdering([{field: 'date', direction: 'desc'}])
                ),

              S.divider(),

              S.listItem()
                .title('All Events')
                .child(
                  S.documentTypeList('event')
                    .title('All Events')
                    .defaultOrdering([{field: 'date', direction: 'desc'}])
                ),
            ])
        ),

      S.divider(),

      // People & Ministries
      S.listItem()
        .title('People & Ministries')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('People & Ministries')
            .items([
              S.listItem()
                .title('All People')
                .icon(UserIcon)
                .child(
                  S.documentTypeList('person')
                    .title('All People')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),

              S.listItem()
                .title('Senior Leadership')
                .icon(UserIcon)
                .child(
                  S.documentTypeList('person')
                    .title('Senior Leadership')
                    .filter('_type == "person" && role == "senior" && active == true')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),

              S.listItem()
                .title('Ministry Leaders')
                .icon(UserIcon)
                .child(
                  S.documentTypeList('person')
                    .title('Ministry Leaders')
                    .filter('_type == "person" && role == "ministry" && active == true')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),

              S.divider(),

              S.listItem()
                .title('All Ministries')
                .icon(UsersIcon)
                .child(
                  S.documentTypeList('ministry')
                    .title('All Ministries')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),

              S.listItem()
                .title('Active Ministries')
                .icon(UsersIcon)
                .child(
                  S.documentTypeList('ministry')
                    .title('Active Ministries')
                    .filter('_type == "ministry" && active == true')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),
            ])
        ),

      S.divider(),

      // Bible Doctrines
      S.listItem()
        .title('Bible Doctrines')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Bible Doctrines')
            .items([
              S.listItem()
                .title('All Doctrines')
                .icon(BookIcon)
                .child(
                  S.documentTypeList('doctrine')
                    .title('All Doctrines')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),

              S.listItem()
                .title('Featured Doctrines')
                .icon(BookIcon)
                .child(
                  S.documentTypeList('doctrine')
                    .title('Featured Doctrines')
                    .filter('_type == "doctrine" && featured == true')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),

              S.divider(),

              S.listItem()
                .title('By Category')
                .child(
                  S.list()
                    .title('Doctrines by Category')
                    .items([
                      S.listItem()
                        .title('The Bible & God')
                        .child(
                          S.documentTypeList('doctrine')
                            .title('The Bible & God')
                            .filter('_type == "doctrine" && category == "bible-god"')
                            .defaultOrdering([{field: 'order', direction: 'asc'}])
                        ),

                      S.listItem()
                        .title('Salvation & Christian Life')
                        .child(
                          S.documentTypeList('doctrine')
                            .title('Salvation & Christian Life')
                            .filter('_type == "doctrine" && category == "salvation"')
                            .defaultOrdering([{field: 'order', direction: 'asc'}])
                        ),

                      S.listItem()
                        .title('Church Ordinances')
                        .child(
                          S.documentTypeList('doctrine')
                            .title('Church Ordinances')
                            .filter('_type == "doctrine" && category == "ordinances"')
                            .defaultOrdering([{field: 'order', direction: 'asc'}])
                        ),

                      S.listItem()
                        .title('End Times')
                        .child(
                          S.documentTypeList('doctrine')
                            .title('End Times')
                            .filter('_type == "doctrine" && category == "end-times"')
                            .defaultOrdering([{field: 'order', direction: 'asc'}])
                        ),

                      S.listItem()
                        .title('Other Doctrines')
                        .child(
                          S.documentTypeList('doctrine')
                            .title('Other Doctrines')
                            .filter('_type == "doctrine" && category == "other"')
                            .defaultOrdering([{field: 'order', direction: 'asc'}])
                        ),
                    ])
                ),
            ])
        ),

      S.divider(),

      // Content Pages & Testimonials
      S.listItem()
        .title('Pages & Testimonials')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Pages & Testimonials')
            .items([
              S.listItem()
                .title('Pages')
                .icon(DocumentTextIcon)
                .child(S.documentTypeList('page').title('Pages')),

              S.divider(),

              S.listItem()
                .title('All Testimonials')
                .icon(HeartIcon)
                .child(
                  S.documentTypeList('testimonial')
                    .title('All Testimonials')
                    .defaultOrdering([{field: 'date', direction: 'desc'}])
                ),

              S.listItem()
                .title('Featured Testimonials')
                .icon(HeartIcon)
                .child(
                  S.documentTypeList('testimonial')
                    .title('Featured Testimonials')
                    .filter('_type == "testimonial" && featured == true')
                    .defaultOrdering([{field: 'date', direction: 'desc'}])
                ),
            ])
        ),
    ])
