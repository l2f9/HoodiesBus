# 🔐 Quick Authentication - Choose ONE Method

## ⚡ FASTEST: Create Personal Access Token (2 minutes)

### Step 1: Create Token
1. **Go to**: https://github.com/settings/tokens
2. **Click**: "Generate new token" → "Generate new token (classic)"
3. **Fill in**:
   - Note: `hoodiesbus-deploy`
   - Expiration: `90 days`
   - Scopes: ✅ Check **`repo`** (this checks all repo boxes)
4. **Scroll down** and click "Generate token"
5. **COPY THE TOKEN** (starts with `ghp_...`)
   - ⚠️ You can only see it once! Copy it now!

### Step 2: Create Repository
1. **Go to**: https://github.com/new
2. **Fill in**:
   - Repository name: `hoodiesbus`
   - Description: `Digital Fashion Platform`
   - ⚠️ **IMPORTANT**: Don't check "Add a README file"
3. **Click**: "Create repository"

### Step 3: Push Your Code
**Copy this command and paste YOUR token:**

```bash
cd C:\Users\MHA\OneDrive\Desktop\Websites\HoodiesBus

git push https://YOUR_TOKEN_HERE@github.com/l2f9/hoodiesbus.git master
```

**Example** (replace the Xs with your actual token):
```bash
git push https://ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx@github.com/l2f9/hoodiesbus.git master
```

---

## 🎯 EXACT STEPS (Copy-Paste These):

**After you get your token from GitHub, run:**

```bash
# 1. Navigate to project
cd C:\Users\MHA\OneDrive\Desktop\Websites\HoodiesBus

# 2. Set git user (if not set)
git config user.email "l2f9@github.com"
git config user.name "l2f9"

# 3. Push with your token
git push https://YOUR_TOKEN@github.com/l2f9/hoodiesbus.git master

# 4. Set as default remote (so future pushes are easier)
git branch --set-upstream-to=origin/master master
```

---

## ✅ After Successful Push:

You should see:
```
Enumerating objects: 50, done.
Counting objects: 100% (50/50), done.
Writing objects: 100% (50/50), done.
To https://github.com/l2f9/hoodiesbus.git
 * [new branch]      master -> master
```

**Then**:
1. Visit https://github.com/l2f9/hoodiesbus
2. You'll see all your code!
3. **Next**: Deploy to Vercel (5 minutes)

---

## 🆘 If You Get Errors:

### "Repository not found"?
→ Make sure you created the repo at https://github.com/new

### "Permission denied"?
→ Make sure your token has `repo` scope checked

### "Authentication failed"?
→ Make sure you copied the FULL token (starts with `ghp_`)

---

## 🚀 READY?

1. **Open**: https://github.com/settings/tokens
2. **Generate** token with `repo` scope
3. **Create** empty repo: https://github.com/new (name: `hoodiesbus`)
4. **Run** command above with YOUR token
5. **Celebrate**! 🎉

**Takes 2 minutes!** Let me know when you've pushed!
