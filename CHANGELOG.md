# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-04-15

### Added
- Initial public release
- Advanced Instagram follower filtering engine
- Dual-scan functionality (following + followers)
- Multiple filter criteria:
  - Follower count range
  - Mutual follow status
  - Account privacy status
  - Verification status
  - Bio and website presence
  - Text search across username, name, and bio
- 4 preset filters for common use cases:
  - Not following back detection
  - Ghost follower identification
  - Fake account detection
  - Inactive account identification
- Bulk selection tools:
  - Select all / deselect all
  - Invert selection
  - Individual checkbox selection
- Mass unfollow functionality with progress tracking
- Data export/import in JSON format
- Modern, responsive UI optimized for desktop and mobile
- Tab-based interface for organization
- Real-time statistics and progress indicators
- LocalStorage-based persistence within session
- Bookmarklet and console script versions
- Complete TypeScript implementation
- MIT license

### Technical Features
- Zero external dependencies
- Pure vanilla JavaScript/TypeScript
- Bundled with esbuild
- Minified for quick execution
- CORS-friendly
- Works on Chromium and Firefox-based browsers

## Planned Features for v1.1

- [ ] User engagement analytics (likes, comments ratio)
- [ ] Temporal analysis (account age, last post date)
- [ ] Batch operations API
- [ ] Custom filter presets saved by user
- [ ] Dark mode theme
- [ ] Hashtag affinity analysis
- [ ] Location-based filtering
- [ ] Scheduled unfollow operations
- [ ] Undo/history management
- [ ] Advanced comparison tools for snapshots
- [ ] Export to CSV format
- [ ] Browser extension version
- [ ] Unit and integration tests
- [ ] Performance optimizations for 100K+ followers

## Known Issues

- Instagram's dynamic loading may require manual scrolling in some cases
- Rate limiting may occur with very large follower lists (50K+)
- Some data is estimated due to Instagram's public API limitations
- Modal dialogs need to remain open during scanning

## Security & Privacy Notes

- v1.0.0: All processing happens client-side, no data sent externally
- No authentication tokens stored permanently
- Session data cleared on browser cache clear
- Recommended to use private browsing for additional privacy

---

For detailed upgrade instructions, see [UPGRADING.md](./UPGRADING.md)
For security concerns, see [SECURITY.md](./SECURITY.md)
