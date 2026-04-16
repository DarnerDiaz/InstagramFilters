# CONTRIBUTING.md

Thanks for your interest in contributing to Instagram Filters! 🎉

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions.

## How to Contribute

### 1. Report Bugs

If you find a bug:
1. Check [existing issues](https://github.com/yourname/InstagramFilters/issues)
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS information
   - Screenshots if applicable

### 2. Suggest Features

Have an idea? Open an issue with:
- Use case description
- Proposed behavior
- Potential implementation notes

### 3. Submit Code

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/description`
3. **Make changes** following the project structure:
   - TypeScript strict mode required
   - Follow existing code style
   - Add JSDoc comments
4. **Test**: Compile and test in browser DevTools
5. **Commit**: Use clear, descriptive messages
6. **Push**: To your fork
7. **Pull Request**: With description of changes

### Code Style

- Use TypeScript with strict mode enabled
- Use camelCase for variables and functions
- Use PascalCase for classes
- Use UPPER_SNAKE_CASE for constants
- 2-space indentation
- Max 100 characters per line (comments can be longer)
- Comment complex logic
- Use meaningful variable names

### Commit Message Format

```
[type] Description of change

Detailed explanation if needed...

Fixes: #123
```

Types: feat, fix, docs, style, refactor, test, chore

## Project Structure

```
src/
  ├── main.ts              # Main app and UI
  ├── types.ts             # TypeScript interfaces
  ├── filter-engine.ts     # Filter logic
  └── instagram-scraper.ts # Instagram data extraction

scripts/
  └── generate-bookmarklet.js  # Build scripts

dist/                       # Generated files (don't edit)
```

## Development Setup

```bash
git clone your-fork-url
cd InstagramFilters
npm install
npm run dev
```

## Testing

Before submitting:
1. Test in Chrome/Chromium DevTools console
2. Test in Firefox if possible
3. Test on mobile (Eruda browser on Android)
4. Verify export/import works
5. Check all filters function correctly

## Questions?

Open a Discussion or mention maintainers in issues.

---

**Note**: This is a hobby project maintained voluntarily. Response times may vary.
