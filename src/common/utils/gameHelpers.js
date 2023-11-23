export const hasWordleEnabled = (sitename) => {
  // Temporary utility till WORDLE is refactored to use the new BE
  const WORDLE_ENABLED_SITES = [
    'tseshahtlanguage',
    'homalco',
    'lilwat',
    'nadleh-stella-whutenne',
    'sliammon',
    'smalgyax-beta',
    'stzuminus',
    'tahltan',
    'wuikala',
  ]

  if (WORDLE_ENABLED_SITES.includes(sitename)) {
    return true
  }
  return false
}
