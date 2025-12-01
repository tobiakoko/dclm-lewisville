import type {StructureResolver} from 'sanity/structure'
import {CogIcon, DocumentsIcon, UsersIcon, CalendarIcon, DocumentTextIcon, BookIcon, HeartIcon} from '@sanity/icons'

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

      // Church Content
      S.listItem()
        .title('Church Content')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Church Content')
            .items([
              S.listItem()
                .title('Pages')
                .icon(DocumentTextIcon)
                .child(S.documentTypeList('page').title('Pages')),

              S.listItem()
                .title('Testimonials')
                .icon(HeartIcon)
                .child(S.documentTypeList('testimonial').title('Testimonials')),
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
                .icon(BookIcon)
                .child(
                  S.documentTypeList('sermon')
                    .title('All Sermons')
                    .filter('_type == "sermon"')
                    .defaultOrdering([{field: 'date', direction: 'desc'}])
                ),

              S.listItem()
                .title('Sermon Series')
                .child(S.documentTypeList('series').title('Sermon Series')),

              S.divider(),

              S.listItem()
                .title('Sermons by Series')
                .child(
                  // Group sermons by series
                  S.documentTypeList('series')
                    .title('Sermons by Series')
                    .child(seriesId =>
                      S.documentList()
                        .title('Sermons')
                        .filter('_type == "sermon" && series._ref == $seriesId')
                        .params({seriesId})
                    )
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
                .title('People')
                .icon(UsersIcon)
                .child(
                  S.documentTypeList('person')
                    .title('People')
                    .filter('_type == "person"')
                    .defaultOrdering([{field: 'name', direction: 'asc'}])
                ),

              S.listItem()
                .title('Ministries')
                .child(S.documentTypeList('ministry').title('Ministries')),
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
                    .filter('_type == "event" && date >= now()')
                    .defaultOrdering([{field: 'date', direction: 'asc'}])
                ),

              S.listItem()
                .title('Past Events')
                .child(
                  S.documentTypeList('event')
                    .title('Past Events')
                    .filter('_type == "event" && date < now()')
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
    ])