// import { useQuery } from '@tanstack/react-query'

// FPCC
// import { SITES } from 'common/constants'
// import api from 'services/api'

export default function useImmersion() {
  // Temporary data - return French Labels for all sites
  const data = {
    count: 8,
    pages: 1,
    pageSize: 100,
    next: null,
    nextUrl: null,
    previous: null,
    previousUrl: null,
    results: [
      { id: '001', label: 'À propos', labelPath: 'general.about' },
      { id: '002', label: 'Alphabet', labelPath: 'general.alphabet' },
      { id: '003', label: 'Application mobile', labelPath: 'general.apps' },
      { id: '004', label: 'Catégories', labelPath: 'general.categories' },
      {
        id: '005',
        label: 'Coordonnées',
        labelPath: 'general.contact_information',
      },
      { id: '006', label: 'Dictionnaire', labelPath: 'general.dictionary' },
      { id: '007', label: 'Jeux', labelPath: 'general.games' },
      { id: '008', label: 'Enfants', labelPath: 'general.kids' },
      { id: '009', label: 'Apprendre', labelPath: 'general.learn' },
      { id: '010', label: 'Nouvelles', labelPath: 'general.news' },
      { id: '011', label: 'Claviers', labelPath: 'general.keyboards' },
      { id: '012', label: 'Notre language', labelPath: 'general.our_language' },
      { id: '013', label: 'Notre peuple', labelPath: 'general.our_people' },
      { id: '014', label: 'Phrases', labelPath: 'general.phrases' },
      {
        id: '015',
        label: 'Liens connexes',
        labelPath: 'general.related_links',
      },
      { id: '016', label: 'Ressources', labelPath: 'general.resources' },
      { id: '017', label: 'Chansons', labelPath: 'general.songs' },
      { id: '018', label: 'Histoires', labelPath: 'general.stories' },
      { id: '019', label: 'Accueillir', labelPath: 'general.welcome' },
      { id: '020', label: 'Mots', labelPath: 'general.words' },
      { id: '021', label: 'Public', labelPath: 'visibility.public' },
      {
        id: '022',
        label: 'Membres seulement',
        labelPath: 'visibility.members',
      },
      { id: '023', label: 'Équipe seulement', labelPath: 'visibility.team' },
    ],
  }
  return { error: null, data, isInitialLoading: false }
}
