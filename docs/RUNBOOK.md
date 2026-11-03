# Runbook: updating the website

For the church staff and volunteers who keep the site current. Everything here is done in the **Studio**, the editing screen at **deeperlifelewisville.org/studio**. You don't need to touch any code.

## Before you start

1. Go to **deeperlifelewisville.org/studio** and sign in with the Sanity account the church gave you.
2. On the left are the editable pages (**Church details**, **Home page**, **Plan Your Visit**, **About page**, **Give page**, **Privacy and Terms**), then lists of **Leaders**, **Ministries**, **Outreach**, **Doctrines**, **Special events**, **Sermons** and **Testimonies**.
3. Changes are drafts until you press **Publish** at the bottom right. The live site updates within a minute of publishing.

**Words in the doctrines, the Pastor's Welcome and the Aderemi and Agbo bios are the church's exact wording.** Change them only with the pastor's approval, word for word.

**Never type in a time, name, phone number, address, link or photo you aren't sure of.** Leave the field empty instead; the site shows an honest placeholder.

## Change a service time

1. Open **Church details**, then the **Schedule** tab.
2. Under **Weekly meetings**, open the meeting (for example *Friday Revival Hour*).
3. Change **Start** or **End** (24-hour time: 7:00 PM is `19:00`), **How to attend**, or the **Join link**.
   - Leave **Join link** empty until the Zoom link exists. The site then shows "[Zoom link to come]".
   - Don't change the **Key**.
4. Press **Publish**.

The new time appears on the home page, Plan Your Visit, Events, the footer and in search results.

**One-off change (for example a cancelled meeting):** in the same tab, add a **Schedule change** with the date, the meeting's key (for example `friday-revival-hour`) and a short note for visitors.

## Change the phone number, email, address or office hours

1. Open **Church details** (the **Church** tab).
2. Edit the field. Write the phone as `(469) 939-6994`.
3. Press **Publish**.

These details appear across the whole site.

## Add a special event

1. Open **Special events** and press **+** (Create).
2. Fill in:
   - **Title**
   - **Starts** and **Ends**, in Central Time
   - **Location**
   - **How to attend**
   - **Registration link**, only if there is one
3. Press **Publish**.

Events show on the Events page until they end, then disappear on their own. Weekly meetings belong in **Church details → Schedule**, not here.

## Post a sermon

Services streamed on the church's YouTube channel appear on the Sermons page automatically, within half an hour of upload. You only need to add a sermon by hand to give it its own page with a speaker and description:

1. Open **Sermons** and press **+**.
2. Enter the **Title** and press **Generate** next to **Slug**.
3. Enter the **Speaker** (only if you're sure), the **Date**, and the **YouTube video ID**. The ID is the 11 characters after `watch?v=` in the video link.
4. Set **Source** to *Lewisville* or *DCLM Headquarters*.
5. Press **Publish**.

## Update giving details

1. Open **Give page**.
2. Under **Ways to give**, replace "Information will be provided shortly." with the confirmed details: the Zelle address, who checks are payable to and the mailing address, and the online giving link.
3. Don't add claims about security or tax deductibility unless the church's treasurer has approved the exact wording.
4. Press **Publish**.

## Add a testimony

1. Get the member's agreement to publish it, and the name they want shown (for example "Bro K").
2. Open **Testimonies** and press **+**.
3. Fill in **Name as shown**, **Title** and **Testimony**. Add **Where it was first published** if it is already public.
4. Turn on **Show on the home page** to feature it. The most recently updated featured testimony is shown.
5. Press **Publish**.

Never write or edit a testimony on someone's behalf.

## Add or change a leader or ministry photo

1. Open the leader (**Leaders**) or ministry (**Ministries**).
2. Upload the **Photo**. In **Description (alt text)**, describe only what is visible, for example "Four women of the church standing together".
3. Never upload stock or AI images as photos of the church.
4. Press **Publish**.

## If something looks wrong

- **The site shows an error page:** call or message the developer. Don't publish placeholder text to cover it.
- **A change hasn't appeared after a few minutes:** check that you pressed **Publish**, not just saved a draft.

## For the developer

- **Seed a new dataset:** `SANITY_WRITE_TOKEN=… npm run seed -- --dataset <name>`. Add `--dry-run` to preview it. The command never overwrites existing documents unless you pass `--replace`.
- **After a schema change:** run `npm run typegen`.
- **Webhook:** in Sanity, go to **API → Webhooks** and set:
  - Name: `Refresh website on publish`
  - URL: `https://dclm-lewisville.vercel.app/api/revalidate` until the domain points to Vercel, then `https://www.deeperlifelewisville.org/api/revalidate`. Use `www`, because the bare domain redirects and webhooks shouldn't go through a redirect.
  - Dataset: `production`
  - Trigger: create, update and delete
  - Filter: `!(_id in path("drafts.**"))`
  - Projection: `{ _type }`
  - Method: `POST`, no extra headers; drafts and versions off
  - Secret: the same value as `SANITY_REVALIDATE_SECRET` in Vercel (Production, marked Sensitive). Generate it with `openssl rand -base64 32`.
  - Check the webhook's **Attempts** tab after publishing: each attempt should return `200`.
