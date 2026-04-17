# CS Webring - George Brown Polytechnic

A webring to feature some of the most cracked CS students at George Brown Polytechnic and give them a place to showcase their personal sites. It's also a way for current students to discover alumni and connect with people who've been through the same programs. Each member is a node on a husky visualization.

## Live

[gbp-ring.com](https://gbp-ring.com)

## Join the ring

### Fork

1. Fork this repo
2. Open `sites.json` and add your entry at the bottom:

```json
{ "name": "Your Name", "year": 2026, "website": "https://yoursite.com" }
```

3. Commit and open a pull request

### Or edit directly (no git needed)

1. Go to [`sites.json`](sites.json) on this repo
2. Click the pencil icon to edit
3. Add your entry at the bottom
4. Click **Propose changes** - GitHub handles the rest

### What each field means

- **`name`** - your real name
- **`year`** - your graduation year
- **`website`** - your personal portfolio (must be live)

## Add the widget to your site

Once you're in the ring, add the GBP Huskies logo to your portfolio so visitors can find the webring. It links back to gbp-ring.com where they can browse all members.

<img src="assets/husky.svg" alt="GBP CS Webring" width="40" height="40" />

Paste this anywhere in your HTML:

```html
<a href="https://gbp-ring.com" target="_blank">
  <img src="https://gbp-ring.com/assets/husky.svg" alt="GBP CS Webring" width="40" height="40" />
</a>
```

If your portfolio uses React/JSX:

```jsx
<a href="https://gbp-ring.com" target="_blank" rel="noopener noreferrer">
  <img src="https://gbp-ring.com/assets/husky.svg" alt="GBP CS Webring" width={40} height={40} />
</a>
```

That's it - a small husky icon that links to the ring. Put it in your footer, sidebar, or wherever you like.

If you're just browsing, give the repo a star - it helps more GBP students find the ring.

## Contribute to the code

Want to help build the site itself? Pull requests are welcome. If you want to collaborate on something bigger, message me on [LinkedIn](https://www.linkedin.com/in/a-shalchian/).

## Dev team

- [Arash Shalchian](https://shalchian.dev)
- [Vy Nguyen](https://vynguyen.dev)
