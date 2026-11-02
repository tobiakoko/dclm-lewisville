// Approved content that isn't a SITE-CONTENT.md section of its own.

/**
 * SITE-CONTENT.md §3: the existing testimony from the current site, a real testimony already
 * public on YouTube and the New Jersey church's website, credited to "Bro K".
 */
export const TESTIMONY = {
  name: 'Bro K',
  title: 'FROM DEPORTATION TO DELIVERANCE: JESUS MIRACULOUSLY RESCUES AND TURNS MISTAKE INTO A MERCY-FILLED MIRACLE',
  content:
    'Jesus is indeed alive! I was on the verge of deportation after my US visa was denied — but our fathers in the Lord prayed for supernatural favor, and Jesus showed up. I was readmitted to the United States the very next day, and multiple souls came to know the Lord along the way. All glory to Jesus for turning my mistake into a miracle of mercy.',
} as const

/** SITE-CONTENT.md §10: three ways, each with the placeholder until the church supplies details */
// TODO(content): Zelle details; check payee and mailing address; online giving provider and link;
// tax-deductibility statement
export const WAYS_TO_GIVE = [
  { title: 'Zelle', detail: 'Information will be provided shortly.' },
  { title: 'Check payable to the church', detail: 'Information will be provided shortly.' },
  { title: 'Online giving', detail: 'Information will be provided shortly.' },
] as const
