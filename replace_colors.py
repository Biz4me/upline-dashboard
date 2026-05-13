#!/usr/bin/env python3
import re
import os

files = [
    'src/app/(dashboard)/page.tsx',
    'src/app/(dashboard)/formation/page.tsx',
    'src/app/(dashboard)/business/page.tsx',
    'src/app/(dashboard)/communaute/page.tsx',
    'src/app/(dashboard)/achievements/page.tsx',
    'src/app/(dashboard)/parrainage/page.tsx',
    'src/app/(dashboard)/profil/page.tsx',
    'src/components/layout/Sidebar.tsx',
    'src/components/layout/BottomNav.tsx',
]

replacements = [
    # Opacities (must come before solid colors)
    (r'bg-\[#E2B84A\]/10', 'bg-[var(--gold-bg)]'),
    (r'bg-\[#E2B84A\]/5', 'bg-[color-mix(in_srgb,var(--gold)_5%,transparent)]'),
    (r'bg-\[#E2B84A\]/15', 'bg-[color-mix(in_srgb,var(--gold)_15%,transparent)]'),
    (r'bg-\[#E2B84A\]/20', 'bg-[color-mix(in_srgb,var(--gold)_20%,transparent)]'),
    (r'bg-\[#E2B84A\]/30', 'bg-[color-mix(in_srgb,var(--gold)_30%,transparent)]'),
    (r'bg-\[#E2B84A\]/40', 'bg-[color-mix(in_srgb,var(--gold)_40%,transparent)]'),
    (r'bg-\[#E2B84A\]/50', 'bg-[color-mix(in_srgb,var(--gold)_50%,transparent)]'),

    (r'bg-\[#2A2318\]/50', 'bg-[color-mix(in_srgb,var(--bg-card)_50%,transparent)]'),

    (r'border-\[#E2B84A\]/10', 'border-[color-mix(in_srgb,var(--gold)_10%,transparent)]'),
    (r'border-\[#E2B84A\]/20', 'border-[color-mix(in_srgb,var(--gold)_20%,transparent)]'),
    (r'border-\[#E2B84A\]/30', 'border-[color-mix(in_srgb,var(--gold)_30%,transparent)]'),
    (r'border-\[#E2B84A\]/40', 'border-[color-mix(in_srgb,var(--gold)_40%,transparent)]'),
    (r'border-\[#E2B84A\]/50', 'border-[color-mix(in_srgb,var(--gold)_50%,transparent)]'),

    (r'hover:border-\[#E2B84A\]/20', 'hover:border-[color-mix(in_srgb,var(--gold)_20%,transparent)]'),
    (r'hover:border-\[#E2B84A\]/30', 'hover:border-[color-mix(in_srgb,var(--gold)_30%,transparent)]'),

    (r'hover:bg-\[#E2B84A\]/10', 'hover:bg-[var(--gold-bg)]'),
    (r'hover:bg-\[#E2B84A\]/30', 'hover:bg-[color-mix(in_srgb,var(--gold)_30%,transparent)]'),

    # Solid backgrounds
    (r'bg-\[#161410\]', 'bg-[var(--bg)]'),
    (r'bg-\[#1E1B14\]', 'bg-[var(--bg-secondary)]'),
    (r'bg-\[#2A2318\]', 'bg-[var(--bg-card)]'),
    (r'bg-\[#E2B84A\]', 'bg-[var(--gold)]'),

    # Text
    (r'text-white', 'text-[var(--text)]'),
    (r'text-\[#A89878\]', 'text-[var(--text-secondary)]'),
    (r'text-\[#6A5A3A\]', 'text-[var(--text-muted)]'),
    (r'text-\[#3d3420\]', 'text-[var(--text-muted)]'),
    (r'text-\[#D4C8A8\]', 'text-[var(--text-secondary)]'),
    (r'text-\[#E2B84A\]', 'text-[var(--gold)]'),
    (r'text-\[#4d4228\]', 'text-[var(--text-muted)]'),

    # Borders
    (r'border-\[#2A2318\]', 'border-[var(--border)]'),

    # Hover backgrounds
    (r'hover:bg-\[#ECC85E\]', 'hover:bg-[var(--gold-hover)]'),
    (r'hover:bg-\[#3d3420\]', 'hover:bg-[var(--border)]'),
    (r'hover:bg-\[#2A2318\]', 'hover:bg-[var(--border)]'),
    (r'hover:bg-\[#161410\]', 'hover:bg-[var(--bg)]'),
    (r'hover:bg-\[#1E1B14\]', 'hover:bg-[var(--bg-secondary)]'),
    (r'hover:bg-\[#E2B84A\]', 'hover:bg-[var(--gold)]'),

    # Hover text
    (r'hover:text-white', 'hover:text-[var(--text)]'),
    (r'hover:text-black', 'hover:text-[var(--bg)]'),
    (r'hover:text-\[#A89878\]', 'hover:text-[var(--text-secondary)]'),
    (r'hover:text-\[#E2B84A\]', 'hover:text-[var(--gold)]'),
    (r'hover:text-\[#6A5A3A\]', 'hover:text-[var(--text-muted)]'),
    (r'hover:text-\[#3d3420\]', 'hover:text-[var(--text-muted)]'),

    # Other utilities
    (r'placeholder-\[#3d3420\]', 'placeholder-[var(--text-muted)]'),
    (r'placeholder-\[#6A5A3A\]', 'placeholder-[var(--text-muted)]'),
    (r'placeholder-\[#A89878\]', 'placeholder-[var(--text-secondary)]'),
    (r'focus:border-\[#E2B84A\]', 'focus:border-[var(--gold)]'),
    (r'focus:border-\[#2A2318\]', 'focus:border-[var(--border)]'),

    # Gradients
    (r'from-\[#E2B84A\]', 'from-[var(--gold)]'),
    (r'to-\[#ECC85E\]', 'to-[var(--gold-hover)]'),
    (r'from-\[#2A2318\]', 'from-[var(--bg-card)]'),
    (r'to-\[#161410\]', 'to-[var(--bg)]'),

    # rgba hardcoded
    (r'rgba\(226,184,74,0\.1\)', 'var(--gold-bg)'),

    # Config object colors (JS strings) - these work in inline styles
    (r"color: '#E2B84A'", "color: 'var(--gold)'"),
    (r"color: '#6A5A3A'", "color: 'var(--text-muted)'"),
    (r"color: '#A89878'", "color: 'var(--text-secondary)'"),
    (r"color: '#3d3420'", "color: 'var(--text-muted)'"),

    (r"bg: '#E2B84A15'", "bg: 'color-mix(in srgb, var(--gold) 15%, transparent)'"),
    (r"bg: '#6A5A3A15'", "bg: 'color-mix(in srgb, var(--text-muted) 15%, transparent)'"),
    (r"bg: '#A8987815'", "bg: 'color-mix(in srgb, var(--text-secondary) 15%, transparent)'"),
    (r"bg: '#3d342015'", "bg: 'color-mix(in srgb, var(--text-muted) 15%, transparent)'"),
]

for filepath in files:
    if not os.path.exists(filepath):
        print(f"SKIP: {filepath} not found")
        continue

    with open(filepath, 'r') as f:
        content = f.read()

    original = content
    for old, new in replacements:
        content = re.sub(old, new, content)

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"UPDATED: {filepath}")
    else:
        print(f"UNCHANGED: {filepath}")
