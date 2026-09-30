# English case image audit

Date: 2026-09-21.

Scope: every img src and video poster in en/cases/{alfa,nspk,vtb,wasd}/index.html, including protected templates, hidden slides and galleries.

85 unique references per case: 76 byte-identical Figma exports, one complete composite export, four existing cropped/composite covers reviewed visually, and the shared mobile menu icon referenced by four cases.

## Changes

- Alfa: replaced the ALF 1.0 image, research illustration, all six scenario images, certificate and video posters with the English-frame assets. Restored the missing first gallery screen (eight total). Article images already match Figma.
- Translated image alt descriptions in all four English cases.

## Source limitations

- Alfa English reference: https://www.figma.com/design/rGW1jeijHl87JxPnjF9Rjh/website?node-id=112-3654
- CPVT, VTB and WASD pages contain Russian case frames; no separate English case frames were found. Their embedded Russian UI screenshots match those sources and were retained. This is source conformity, not complete raster-text localization.
- Some historical interfaces, article pictures and video material in the Alfa English frame also contain Russian text. They were not redrawn.

## Verification

Chrome at 1440 and 390 px: all four routes, 93 img elements at each width, no broken images, Russian alt text, JavaScript errors or horizontal page overflow. All six Alfa scenario states work. Eight gallery images present. npm run build passed.

## Per-file results

### alfa

| Path | Result |
| --- | --- |
| `/assets/40-34647-imgSubtract.svg` | Exact Figma bytes |
| `/assets/40-34647-imgSubtract1.svg` | Exact Figma bytes |
| `/assets/menu.svg` | Shared mobile navigation icon; loads correctly |
| `/assets/alfa/en/intro-poster.png` | Exact Figma bytes |
| `/assets/alfa/en/imgImage54Eng.png` | Exact Figma bytes |
| `/assets/alfa/en/research.png` | Complete Figma node export: 112:3759 |
| `/assets/alfa/en/imgImage91Eng.png` | Exact Figma bytes |
| `/assets/alfa/en/imgImage91Eng1.png` | Exact Figma bytes |
| `/assets/alfa/en/imgImage91Eng2.png` | Exact Figma bytes |
| `/assets/alfa/en/imgImage88.png` | Exact Figma bytes |
| `/assets/alfa/en/imgImage78.png` | Exact Figma bytes |
| `/assets/alfa/en/imgImage81.png` | Exact Figma bytes |
| `/assets/alfa/en/imgImage82.png` | Exact Figma bytes |
| `/assets/alfa/en/imgImage83.png` | Exact Figma bytes |
| `/assets/alfa/en/imgImage86.png` | Exact Figma bytes |
| `/assets/alfa/en/imgImage87.png` | Exact Figma bytes |
| `/assets/alfa/en/imgImage85.png` | Exact Figma bytes |
| `/assets/alfa/en/imgImage91Eng3.png` | Exact Figma bytes |
| `/assets/alfa/en/imgImage91Eng4.png` | Exact Figma bytes |
| `/assets/alfa/en/voice-poster.png` | Exact Figma bytes |
| `/assets/alfa/en/imgImage73.png` | Exact Figma bytes |
| `/assets/alfa/imgPicture2.png` | Exact Figma bytes |
| `/assets/alfa/imgPicture1.png` | Exact Figma bytes |
| `/assets/alfa/imgPicture4.png` | Exact Figma bytes |

### nspk

| Path | Result |
| --- | --- |
| `/assets/40-34647-imgSubtract.svg` | Exact Figma bytes |
| `/assets/40-34647-imgSubtract1.svg` | Exact Figma bytes |
| `/assets/menu.svg` | Shared mobile navigation icon; loads correctly |
| `/assets/nspk/hero.png` | Existing composite/cropped cover; visually checked |
| `/assets/nspk/112-3936-imgImage261.png` | Exact Figma bytes |
| `/assets/nspk/112-3936-imgImage262.png` | Exact Figma bytes |
| `/assets/nspk/112-3936-imgImage263.png` | Exact Figma bytes |
| `/assets/nspk/111-8727-imgTime.svg` | Exact Figma bytes |
| `/assets/nspk/111-8727-imgWarning.svg` | Exact Figma bytes |
| `/assets/nspk/111-8727-imgComponent.svg` | Exact Figma bytes |
| `/assets/nspk/111-8727-imgImage56.png` | Exact Figma bytes |
| `/assets/nspk/112-4124-imgImage265.png` | Exact Figma bytes |
| `/assets/nspk/112-4124-imgImage264.png` | Exact Figma bytes |
| `/assets/nspk/112-4163-imgImage72.png` | Exact Figma bytes |
| `/assets/nspk/112-4163-imgImage266.png` | Exact Figma bytes |
| `/assets/nspk/111-8727-imgImage59.png` | Exact Figma bytes |
| `/assets/nspk/111-8727-imgImage.png` | Exact Figma bytes |
| `/assets/nspk/111-8727-imgArrowForward.svg` | Exact Figma bytes |

### vtb

| Path | Result |
| --- | --- |
| `/assets/40-34647-imgSubtract.svg` | Exact Figma bytes |
| `/assets/40-34647-imgSubtract1.svg` | Exact Figma bytes |
| `/assets/menu.svg` | Shared mobile navigation icon; loads correctly |
| `/assets/vtb/hero.png` | Existing composite/cropped cover; visually checked |
| `/assets/vtb/slider-imgImage54.png` | Exact Figma bytes |
| `/assets/vtb/slider-imgImage56.png` | Exact Figma bytes |
| `/assets/vtb/slider-imgImage55.png` | Exact Figma bytes |
| `/assets/vtb/imgWallet.svg` | Exact Figma bytes |
| `/assets/vtb/imgStats.svg` | Exact Figma bytes |
| `/assets/vtb/imgComponent.svg` | Exact Figma bytes |
| `/assets/vtb/imgImage97.png` | Exact Figma bytes |
| `/assets/vtb/imgImage91.png` | Exact Figma bytes |
| `/assets/vtb/imgImage92.png` | Exact Figma bytes |
| `/assets/vtb/imgImage93.png` | Exact Figma bytes |
| `/assets/vtb/imgImage94.png` | Exact Figma bytes |
| `/assets/vtb/imgImage95.png` | Exact Figma bytes |
| `/assets/vtb/imgImage96.png` | Exact Figma bytes |
| `/assets/vtb/imgImage78.png` | Exact Figma bytes |
| `/assets/vtb/imgImage81.png` | Exact Figma bytes |
| `/assets/vtb/imgImage82.png` | Exact Figma bytes |
| `/assets/vtb/imgImage83.png` | Exact Figma bytes |
| `/assets/vtb/imgImage86.png` | Exact Figma bytes |
| `/assets/vtb/imgImage87.png` | Exact Figma bytes |
| `/assets/vtb/imgImage88.png` | Exact Figma bytes |
| `/assets/vtb/imgImage85.png` | Exact Figma bytes |
| `/assets/vtb/next-alfa.png` | Existing composite/cropped cover; visually checked |
| `/assets/vtb/imgArrowForward.svg` | Exact Figma bytes |

### wasd

| Path | Result |
| --- | --- |
| `/assets/40-34647-imgSubtract.svg` | Exact Figma bytes |
| `/assets/40-34647-imgSubtract1.svg` | Exact Figma bytes |
| `/assets/menu.svg` | Shared mobile navigation icon; loads correctly |
| `/assets/wasd/imgSlide1691417.png` | Exact Figma bytes |
| `/assets/wasd/imgImage54.png` | Exact Figma bytes |
| `/assets/wasd/imgImage55.png` | Exact Figma bytes |
| `/assets/wasd/imgTime.svg` | Exact Figma bytes |
| `/assets/wasd/imgWarning.svg` | Exact Figma bytes |
| `/assets/wasd/imgComponent.svg` | Exact Figma bytes |
| `/assets/wasd/imgImage91.png` | Exact Figma bytes |
| `/assets/wasd/imgImage92.png` | Exact Figma bytes |
| `/assets/wasd/imgImage93.png` | Exact Figma bytes |
| `/assets/wasd/imgImage94.png` | Exact Figma bytes |
| `/assets/wasd/imgImage95.png` | Exact Figma bytes |
| `/assets/wasd/next-nspk.png` | Existing composite/cropped cover; visually checked |
| `/assets/wasd/imgArrowForward.svg` | Exact Figma bytes |
