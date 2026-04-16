# 🔒 Security & Safety Guide

## Security Architecture

### What We Do
✅ **100% Client-Side Processing**
- All data processing happens in your browser
- No data sent to external servers
- No backend database
- No tracking or analytics

✅ **Privacy by Design**
- LocalStorage only for current session
- Data cleared when you clear browser cache
- No cookies tracking across sites
- No IP logging or device identification

✅ **Open Source**
- Code is publicly auditable
- MIT License - transparent and permissive
- Community review and contributions

### What We DON'T Do
❌ Store Instagram credentials
❌ Access your password or 2FA codes
❌ Send data to third-party services
❌ Track your activity or usage
❌ Inject ads or malware
❌ Sell or share your data

## Instagram Terms of Service

### ⚠️ Important Disclaimer
IMPORTANT: This tool is not affiliated with Instagram or Meta.

Using automation tools on Instagram may violate their Terms of Service. Risks include:
- Account suspension (temporary)
- Account ban (permanent)
- Action limits (rate limiting)
- Content moderation penalties

### How to Minimize Risk

#### 1. **Use Responsibly**
- Don't unfollow 1000 people in 1 hour
- Spread actions over multiple sessions (8+ hour gaps)
- Recommended: 50-100 unfollows per session
- Monitor account daily for any notices

#### 2. **Use From Desktop**
- Instagram monitors mobile app activity more strictly
- Using from browser is less likely to trigger flags
- Avoid using on multiple devices simultaneously

#### 3. **Typical Safe Limits**
```
Light User:     50-100 unfollows/day
Regular User:   200-300 unfollows/day (in multiple sessions)
Heavy User:     400-500 unfollows/day (spaced across many sessions)

NEVER:          More than 1000 in 24 hours (high ban risk)
```

#### 4. **Spacing Strategy**
```
Session 1: Unfollow 50-100 users
Wait: 8-12 hours
Session 2: Unfollow 50-100 users
Wait: 8-12 hours
Session 3: Continue pattern

If you get action limit warning → STOP and wait 24+ hours
```

#### 5. **Monitor Your Account**
- Check regularly for suspicious activity
- Instagram may send warning notices
- If warned, don't use automation tools for 1-2 weeks
- Account might show "Take a Break" messages

## Browser Security

### Required Permissions
This tool requires NO special permissions:
- ❌ Doesn't request microphone/camera access
- ❌ Doesn't request location
- ❌ Doesn't request clipboard access
- ❌ Doesn't request storage beyond LocalStorage

### Safe Usage from DevTools
When pasting code into DevTools console:
1. Only paste from official GitHub (check URL)
2. Review code before pasting (scroll to read)
3. Never paste from random websites
4. Close console immediately after pasting

### Browser Recommendations
- ✅ Chrome/Chromium (most compatible)
- ✅ Firefox (fully supported)
- ✅ Edge (Chromium-based, compatible)
- ❌ Safari (not officially supported)
- ❌ Mobile browsers (limited DevTools)

## Data Protection

### What Happens to Your Data
1. **On Scan**: Data loaded temporarily in memory
2. **Displayed**: Shown in the UI for your interaction
3. **Exported**: Saved to your Downloads folder (your file)
4. **On Refresh**: All session data lost (cleared from memory)
5. **On Browser Close**: All data completely removed

### If You Export Data
- File contains your followers data in plain JSON
- Treat like sensitive information
- Don't share with untrusted parties
- Keep in secure location
- Consider encryption for large exports

### LocalStorage
- Stored in: `chrome://extensions` (local data)
- Contains: Only current session data
- Cleared when: Browser cache cleared
- Accessible by: Only this script on Instagram domain

## Best Practices

### For Safety
1. **Use Official URL Only**
   - GitHub.com/yourusername/InstagramFilters
   - cdn.jsdelivr.net (trusted CDN)
   - Never from random pastebin sites

2. **Verify Code**
   - Check file size (should be ~20-50KB)
   - Look for GitHub URL in source
   - Code should start with TypeScript definitions

3. **Backup Your Data**
   - Export important analysis (settings button)
   - Keep exports on secure drive
   - Don't share with others

4. **Monitor Activity**
   - Don't leave script running 24/7
   - Close tab/browser after use
   - Check Instagram feed for warnings
   - Monitor follower counts

### For Privacy
1. **Use Private Browsing** (optional)
   - Incognito mode for extra privacy
   - Data auto-clears on window close
   - No history saved

2. **VPN Considerations**
   - Instagram detects VPN usage
   - Might trigger security checks
   - Not required, but use quality VPN if needed
   - Instagram's speed might vary

3. **Don't Automate Everything**
   - Mix automation with manual actions
   - Occasionally scroll feed manually
   - Do some follows/unfollows manually
   - Appear like normal user activity

## Incident Response

### If You Get Action Limit Warning
```
1. STOP using the tool immediately
2. Wait 24-48 hours
3. Use Instagram normally (like regular user)
4. Don't attempt to bypass restrictions
5. After 48 hours, try light usage
```

### If Your Account Gets Suspended
```
1. Check your notifications/email from Instagram
2. Usually temporary (1-7 days for first offense)
3. Use Instagram normally when unsuspended
4. Avoid tool for 2-4 weeks minimum
5. Resume with more conservative limits

If account is permanently banned:
- It's unrecoverable
- Create new account and be more careful
- Read Instagram's automation policies
```

### If You Suspect Security Issue
1. Open issue on GitHub with details
2. DO NOT share credentials or personal data
3. Describe the behavior observed
4. Include browser/OS information
5. Security team will investigate

## FAQ - Security Related

**Q: Will Instagram ban my account?**
A: Possible but uncommon if used responsibly. Follows same risks as other tools.

**Q: Is my password safe?**
A: Yes! Script never requests or accesses passwords. Instagram logs you in via browser session.

**Q: Can anyone see what I'm doing?**
A: No. All processing is local. Only Instagram sees your actual unfollows.

**Q: What if I close the browser window?**
A: All data cleared immediately. No residual data remains.

**Q: Can I be tracked?**
A: No external tracking. Only Instagram knows you used the tool (via their logs).

**Q: Is it a virus/malware?**
A: No. Open source code = fully auditable. Community reviews security.

**Q: Does it steal data?**
A: No. Zero data collection. Source code proves this.

---

## Contact for Security Issues

Found a vulnerability?
- 🔒 DO NOT create public issue
- 📧 Email: [security contact] with details
- 🔐 Use GPG if available for sensitive info
- 👥 Responsible disclosure appreciated

---

**Last Updated**: April 2024
**Version**: 1.0.0
**Status**: Security Best Practices v1.0
