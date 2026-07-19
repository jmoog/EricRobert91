// Contenu local UNIQUE des 21 pages villes prioritaires.
// Règles : ancrage par la géographie (jamais par le climat ni l'architecture),
// 1 ancre contextuelle max par paragraphe, la page ville LOCALISE (elle ne
// re-décrit pas les services — les piliers s'en chargent).
// h1tag : complément du H1 (évite la triplette title/H1/meta).
// hero/corps : HTML (ancres autorisées dans corps uniquement).

export interface VilleContenu {
  /** Complément du H1 : « Entreprise de couverture à X : {h1tag} » (anti-triplette : le title garde « Couvreur à X », la meta « Couvreur-zingueur à X ») */
  h1tag: string;
  /** Meta description unique (≤155 c.) */
  meta: string;
  /** 2 paragraphes du hero (texte pur) */
  hero: [string, string];
  /** 2 paragraphes de corps (HTML, 1 ancre contextuelle max chacun) */
  corps: [string, string];
  /** Slugs des communes voisines réellement proches */
  voisines: string[];
}

export const villesContenu: Record<string, VilleContenu> = {
  linas: {
    h1tag: 'devis gratuit, artisan local',
    meta: "Couvreur-zingueur à Linas (91310) : Éric Robert, artisan RGE basé dans la commune. Toiture, ramonage, démoussage — intervention immédiate, devis gratuit.",
    hero: [
      "À Linas, vous n'appelez pas un couvreur de passage : vous appelez l'artisan du village. Éric Robert est installé route d'Orléans, à deux pas de l'autodrome — c'est d'ici que partent tous les chantiers du département.",
      "Toiture à réparer, cheminée à ramoner, mousse à traiter : être couvreur dans sa propre commune, c'est intervenir vite et soigner sa réputation à domicile. Devis gratuit, souvent le jour même.",
    ],
    corps: [
      "Du centre-bourg aux quartiers proches de Montlhéry et de Guillerville, les pavillons de Linas ont leurs habitudes : tuiles mécaniques des années 70-90, cheminées encore très utilisées. Le <a href=\"/prestations/ramonage-91/\">ramonage à domicile</a> est d'ailleurs la demande n°1 des Linois — profitez des tournées locales pour obtenir un créneau rapide.",
      "Sur les toits de la commune, la proximité permet aussi un suivi que les entreprises lointaines ne font pas : un passage de contrôle rapide, une tuile recalée dans la journée, un <a href=\"/nettoyage-demoussage-toiture-91/\">démoussage de toiture</a> programmé à la bonne saison. Votre toit a un référent, à moins de cinq minutes.",
    ],
    voisines: ['la-ville-du-bois', 'arpajon', 'sainte-genevieve-des-bois', 'champlan'],
  },
  arpajon: {
    h1tag: 'votre professionnel de la toiture',
    meta: "Couvreur-zingueur à Arpajon (91290) : réfection, réparation et entretien de toiture par Éric Robert, artisan RGE à 10 minutes. Devis et déplacement gratuits.",
    hero: [
      "Entre les toits serrés du centre historique, autour de la halle et de la Grande Rue, et les pavillons des quartiers Saint-Germain ou des Émondants, Arpajon fait cohabiter des toitures qui n'ont ni le même âge ni les mêmes besoins.",
      "Basé à Linas, à dix minutes par la N20, Éric Robert intervient à Arpajon pour tout ce qui touche au toit : réparations, réfections, entretien, zinguerie. Devis et déplacement gratuits.",
    ],
    corps: [
      "Les couvertures du centre ancien demandent des reprises fines : tuiles plates, noues étroites, mitoyennetés. Quand une couverture arrive en bout de course, la <a href=\"/prestations/renovation-detoiture/\">rénovation de toiture</a> se planifie rue par rue, avec les contraintes de circulation et d'échafaudage du centre-ville.",
      "Côté pavillons, les demandes arpajonnaises rejoignent celles de tout le Val d'Orge : gouttières à reprendre, velux vieillissants, combles à isoler. Une <a href=\"/reparation-toiture-fuite-91/\">fuite de toiture</a> se traite en priorité — le secteur est desservi en direct par la N20, les délais restent courts.",
    ],
    voisines: ['linas', 'la-ville-du-bois', 'etrechy', 'sainte-genevieve-des-bois'],
  },
  'corbeil-essonnes': {
    h1tag: 'votre expert toiture, devis gratuit',
    meta: "Couvreur-zingueur à Corbeil-Essonnes (91100) : toiture, Velux, zinguerie par Éric Robert, artisan RGE Qualibat. Intervention dans tous les quartiers, devis gratuit.",
    hero: [
      "Grande ville aux visages multiples, Corbeil-Essonnes aligne les toits du centre ancien près de la cathédrale Saint-Spire, les pavillons de Moulin-Galant ou du Coudray et les rues résidentielles côté Essonne. Autant de toitures, autant de configurations.",
      "Éric Robert, couvreur basé à Linas, intervient dans tous les quartiers corbeillois pour la couverture, la zinguerie et les fenêtres de toit. Devis et déplacement gratuits.",
    ],
    corps: [
      "Dans les rues pavillonnaires corbeilloises, la demande de lumière est réelle : beaucoup de combles s'aménagent. La <a href=\"/installateur-de-velux-91/\">pose de Velux par un installateur RGE</a> y ouvre droit aux aides — un argument qui compte dans les projets d'agrandissement par le toit.",
      "Les toitures proches de la Seine et de l'Essonne voient aussi leurs gouttières travailler dur ; noues et descentes méritent un contrôle régulier. En cas de doute après un débordement, la <a href=\"/reparation-toiture-fuite-91/\">recherche de fuite</a> fait la part des choses entre zinguerie fatiguée et couverture en cause.",
    ],
    voisines: ['evry', 'draveil', 'montgeron', 'savigny-sur-orge'],
  },
  montgeron: {
    h1tag: 'votre professionnel de la toiture',
    meta: "Couvreur-zingueur à Montgeron (91230) : démoussage, ramonage et entretien de toiture en bordure de Sénart, par Éric Robert. Devis gratuit, artisan RGE Qualibat.",
    hero: [
      "À Montgeron, la forêt de Sénart fait le charme des rues — et le quotidien des toitures : sous les grands arbres, mousses et débris végétaux colonisent les couvertures bien plus vite qu'ailleurs, et les gouttières se chargent à chaque automne.",
      "Éric Robert entretient les toits montgeronnais de l'avenue de la République aux quartiers de la Glacière et du Réveil-Matin : nettoyage, traitement, ramonage et réparations. Devis et déplacement gratuits.",
    ],
    corps: [
      "Sous le couvert des chênes de Sénart, un <a href=\"/nettoyage-demoussage-toiture-91/\">démoussage de toiture avec traitement</a> tous les cinq ans n'a rien d'un luxe : c'est l'entretien de base qui évite tuiles poreuses et gouttières bouchées. Les toits montgeronnais sont en tête de nos tournées d'entretien.",
      "Autre demande forte dans la commune : le <a href=\"/prestations/ramonage-91/\">ramonage de cheminée</a>, très pratiqué dans les pavillons proches de la forêt où le chauffage au bois reste roi. Certificat remis sur place pour votre assurance.",
    ],
    voisines: ['draveil', 'corbeil-essonnes', 'evry', 'savigny-sur-orge'],
  },
  etrechy: {
    h1tag: 'votre expert toiture et charpente',
    meta: "Couvreur-zingueur à Étréchy (91580) : réfection, charpente et entretien de toiture dans la vallée de la Juine par Éric Robert, artisan RGE. Devis gratuit.",
    hero: [
      "Entre coteaux et vallée de la Juine, Étréchy mêle maisons de bourg anciennes autour de l'église Saint-Étienne et pavillons plus récents vers la gare du RER C. Les premières ont souvent des charpentes centenaires, les seconds des couvertures qui arrivent à l'âge des premiers travaux.",
      "Depuis Linas par la N20, Éric Robert descend régulièrement sur le secteur strépiniacois pour des chantiers de couverture, de charpente et d'entretien. Devis et déplacement gratuits.",
    ],
    corps: [
      "Dans les longères et maisons anciennes du vieux bourg, les bois méritent une attention particulière : vrillettes et capricornes apprécient les charpentes d'origine. Un <a href=\"/traitement-de-charpente/\">diagnostic de charpente gratuit</a> fixe l'état réel des pièces avant tout projet de réfection ou d'aménagement.",
      "Pour les pavillons des hauts d'Étréchy, les demandes classiques dominent : tuiles à remplacer, gouttières à reprendre, mousse à traiter. Une <a href=\"/prestations/renovation-detoiture/\">rénovation de toiture</a> se chiffre gratuitement, scénarios comparés à l'appui.",
    ],
    voisines: ['arpajon', 'saclas', 'mereville', 'linas'],
  },
  'savigny-sur-orge': {
    h1tag: 'votre professionnel de la toiture',
    meta: "Couvreur-zingueur à Savigny-sur-Orge (91600) : rénovation, isolation et entretien des toits saviniens par Éric Robert, artisan RGE Qualibat. Devis gratuit.",
    hero: [
      "Savigny-sur-Orge, c'est l'un des plus grands parcs pavillonnaires du département : des rues entières de maisons des années 30 aux années 70, de Grand-Vaux aux coteaux de l'Orge. Ces toitures ont donné, et beaucoup arrivent ensemble à l'heure des choix.",
      "Éric Robert accompagne les Saviniens dans ces arbitrages : réparer, rénover, isoler — avec un devis détaillé pour chaque scénario. Déplacement gratuit depuis Linas, à un quart d'heure.",
    ],
    corps: [
      "Sur les pavillons d'avant-guerre, les tuiles mécaniques d'origine s'effritent et les zingueries d'époque fatiguent : la <a href=\"/prestations/renovation-detoiture/\">réfection de toiture</a> est la grande affaire des rues saviniennes, souvent l'occasion de repartir sur des bases saines pour quarante ans.",
      "Les maisons des années 60-70, elles, pèchent surtout par leurs combles nus : l'<a href=\"/isolation-des-combles/\">isolation des combles perdus</a>, certifiée RGE et aidée, y produit des économies immédiates — le chantier le plus rentable du secteur.",
    ],
    voisines: ['morsang-sur-orge', 'sainte-genevieve-des-bois', 'draveil', 'montgeron'],
  },
  'morsang-sur-orge': {
    h1tag: 'devis gratuit, intervention rapide',
    meta: "Couvreur-zingueur à Morsang-sur-Orge (91390) : réparation, démoussage et isolation par Éric Robert, artisan RGE à 15 minutes. Devis et déplacement gratuits.",
    hero: [
      "Des abords du château et de son parc aux rues pavillonnaires qui grimpent sur les coteaux de l'Orge, Morsang aligne des maisons familiales dont les toitures ont trente à soixante ans — l'âge où l'entretien décide de tout.",
      "Éric Robert intervient chez les Morsaintois pour les réparations, le démoussage et l'isolation, à un quart d'heure de Linas, où il est installé. Devis et déplacement gratuits.",
    ],
    corps: [
      "Une tuile qui glisse, un faîtage qui s'ouvre, une auréole au plafond d'une chambre : sur des couvertures de cet âge, la <a href=\"/reparation-toiture-fuite-91/\">réparation de toiture</a> prise à temps évite le chantier lourd. Les photos avant/après vous sont systématiquement remises.",
      "Beaucoup de maisons morsaintoises gardent leurs combles en l'état d'origine : un gisement d'économies dort sous les toits. L'<a href=\"/isolation-des-rampants/\">isolation des rampants</a> pour les combles aménagés, celle des combles perdus pour les autres — dans les deux cas avec les aides RGE.",
    ],
    voisines: ['savigny-sur-orge', 'sainte-genevieve-des-bois', 'evry', 'linas'],
  },
  mereville: {
    h1tag: 'votre expert toiture',
    meta: "Couvreur-zingueur à Méréville (91660) : couverture, charpente et entretien des toits du sud Essonne par Éric Robert, artisan RGE Qualibat. Devis gratuit.",
    hero: [
      "Autour de sa halle classée et le long de la Juine, Méréville garde un bâti de bourg rural : longères, granges réaménagées, maisons de pays aux toitures généreuses. Plus au calme que dans le nord du département — mais avec des toits qui demandent un vrai savoir-faire.",
      "Éric Robert descend régulièrement dans le Mérévillois pour des chantiers de couverture et de charpente. Le déplacement reste gratuit, même à cette distance de Linas.",
    ],
    corps: [
      "Sur les longères et granges de la vallée de la Juine, les charpentes anciennes sont le nerf du chantier : un <a href=\"/traitement-de-charpente/\">traitement de charpente</a> précède souvent la réfection, pour repartir sur des bois sains avant de refermer.",
      "Les couvertures de pays — tuile plate, grands pans — se réparent avec leurs codes : calepinage respecté, teintes assorties, zinguerie discrète. Nos <a href=\"/travaux-de-couverture/\">travaux de couverture</a> couvrent ces reprises, du remplacement de tuiles à la réfection d'un pan complet.",
    ],
    voisines: ['saclas', 'etrechy', 'milly-la-foret', 'arpajon'],
  },
  'milly-la-foret': {
    h1tag: 'votre professionnel de la toiture',
    meta: "Couvreur-zingueur à Milly-la-Forêt (91490) : démoussage, couverture et charpente aux portes du Gâtinais par Éric Robert, artisan RGE. Devis gratuit.",
    hero: [
      "Entre la halle du XVe siècle et les lisières des Trois Pignons, Milly-la-Forêt cultive un cadre à part : maisons de bourg dans le centre, propriétés sous les arbres vers Fontainebleau. Un environnement magnifique — et exigeant pour les toitures.",
      "Éric Robert intervient dans le Gâtinais milliacois pour l'entretien, la couverture et la charpente. Devis et déplacement gratuits, comme partout dans le 91.",
    ],
    corps: [
      "Sous les frondaisons, les couvertures milliacoises verdissent vite : aiguilles, feuilles et mousses s'accumulent à l'ombre des grands arbres. Un <a href=\"/nettoyage-demoussage-toiture-91/\">nettoyage et démoussage régulier</a>, suivi d'un traitement, garde les tuiles saines malgré le voisinage forestier.",
      "Le bâti ancien du centre — halle, ruelles, murs en grès — appelle des interventions respectueuses : reprises de tuile plate, zinguerie façonnée, charpentes surveillées. Un <a href=\"/traitement-de-charpente/\">diagnostic des bois gratuit</a> est le bon point de départ avant tout projet dans une maison ancienne.",
    ],
    voisines: ['mereville', 'etrechy', 'corbeil-essonnes', 'saclas'],
  },
  palaiseau: {
    h1tag: 'votre expert toiture, devis gratuit',
    meta: "Couvreur-zingueur à Palaiseau (91120) : toiture, isolation et Velux du centre au plateau, par Éric Robert, artisan RGE Qualibat. Devis et déplacement gratuits.",
    hero: [
      "De la rue de Paris aux hauteurs de Lozère, du quartier du Pileu aux abords du plateau de Saclay, Palaiseau superpose les époques : maisons meulières, pavillons d'après-guerre, constructions récentes autour de Camille-Claudel.",
      "Éric Robert suit les toits palaisiens depuis Linas, à vingt minutes par la N20 et la Francilienne : entretien, réparations, isolation et fenêtres de toit. Devis gratuit.",
    ],
    corps: [
      "Dans les rues de meulières, les combles se transforment volontiers en pièces à vivre : la <a href=\"/installateur-de-velux-91/\">pose de fenêtres de toit Velux</a>, réalisée par un installateur RGE, apporte la lumière qui manque sous ces charpentes hautes — aides à la clé.",
      "Les pavillons des années 50-70 du Pileu ou de Lozère jouent une autre partition : combles nus, factures lourdes. L'<a href=\"/isolation-des-combles/\">isolation des combles perdus</a> y reste le geste le plus efficace, aidée elle aussi au titre du RGE.",
    ],
    voisines: ['igny', 'orsay', 'champlan', 'wissous'],
  },
  'sainte-genevieve-des-bois': {
    h1tag: 'votre professionnel de la toiture',
    meta: "Couvreur-zingueur à Sainte-Geneviève-des-Bois (91700) : rénovation, démoussage, isolation par Éric Robert, artisan RGE à 10 minutes. Devis gratuit.",
    hero: [
      "Du Donjon au Perray, Sainte-Geneviève-des-Bois déroule l'un des plus vastes tissus pavillonnaires du Val d'Orge : des milliers de maisons familiales, et autant de toitures à suivre, entretenir et rénover au fil des décennies.",
      "À dix minutes de Linas, où il est installé, Éric Robert est l'un des couvreurs les plus proches des Génovéfains. Réactivité et devis gratuit — la proximité a des avantages concrets.",
    ],
    corps: [
      "Dans les rues du Perray ou vers la Croix-Blanche, beaucoup de toitures des années 60-80 arrivent à maturité en même temps : tuiles ternies, mousses installées. Un <a href=\"/nettoyage-demoussage-toiture-91/\">démoussage avec traitement</a> redonne dix ans aux couvertures encore saines — et l'inspection repère celles qui demandent plus.",
      "Pour ces dernières, le choix se pose entre reprises ciblées et réfection : notre page <a href=\"/prestations/renovation-detoiture/\">rénovation de toiture</a> détaille les critères, et le devis compare les scénarios chiffres en main, sans pousser au chantier inutile.",
    ],
    voisines: ['morsang-sur-orge', 'savigny-sur-orge', 'linas', 'arpajon'],
  },
  igny: {
    h1tag: 'devis gratuit, artisan RGE',
    meta: "Couvreur-zingueur à Igny (91430) : isolation, réparation et entretien de toiture dans la vallée de la Bièvre par Éric Robert, artisan RGE. Devis gratuit.",
    hero: [
      "Blottie dans la vallée de la Bièvre entre Palaiseau et Verrières, Igny aligne pavillons familiaux et maisons de caractère du côté de Gommonvilliers. Des toits à taille humaine, mais qui n'échappent pas aux années qui passent.",
      "Éric Robert intervient chez les Ignissois pour l'entretien, les réparations et l'isolation. Depuis Linas, l'accès par la N118 ou la N20 garde les délais courts. Devis gratuit.",
    ],
    corps: [
      "Les pavillons ignissois des années 60-70 partagent un point faible bien connu : des combles à peine isolés. L'<a href=\"/isolation-des-combles/\">isolation des combles perdus</a>, aidée au titre de la certification RGE, y transforme la facture de chauffage dès le premier hiver.",
      "Pour les combles déjà aménagés sous les toits pentus de la vallée, c'est l'<a href=\"/isolation-des-rampants/\">isolation des rampants</a> qui rend les chambres d'en haut vivables toute l'année — même artisan, mêmes aides, autre technique.",
    ],
    voisines: ['palaiseau', 'champlan', 'wissous', 'orsay'],
  },
  orsay: {
    h1tag: 'votre expert toiture',
    meta: "Couvreur-zingueur à Orsay (91400) : toiture, isolation et fenêtres de toit dans la vallée de l'Yvette par Éric Robert, artisan RGE Qualibat. Devis gratuit.",
    hero: [
      "Entre la vallée de l'Yvette, le quartier du Guichet et les coteaux qui montent vers le plateau, Orsay mêle maisons meulières, pavillons universitaires des années 60 et villas sous les arbres. Des toitures variées, souvent belles, toujours exigeantes.",
      "Éric Robert suit les toits orcéens pour l'entretien, l'isolation et les ouvertures de toit. Devis et déplacement gratuits depuis Linas.",
    ],
    corps: [
      "Sur les meulières du centre et du Guichet, les combles hauts se prêtent magnifiquement à l'aménagement : la <a href=\"/installateur-de-velux-91/\">pose de Velux certifiée RGE</a> y fait entrer la lumière sans dénaturer les volumes — chevêtre préparé dans les règles, aides mobilisables.",
      "Les versants ombragés de la vallée, eux, verdissent plus vite : mousses et lichens s'installent côté nord. Un <a href=\"/traitement-anti-mousse-toiture-91/\">traitement anti-mousse professionnel</a> après nettoyage garde les couvertures orcéennes saines durablement.",
    ],
    voisines: ['gif-sur-yvette', 'palaiseau', 'igny', 'pecqueuse'],
  },
  'gif-sur-yvette': {
    h1tag: 'votre professionnel de la toiture',
    meta: "Couvreur-zingueur à Gif-sur-Yvette (91190) : démoussage, toiture et isolation, de la vallée à Chevry, par Éric Robert, artisan RGE. Devis gratuit.",
    hero: [
      "Gif-sur-Yvette vit sur deux registres : le bourg ancien et ses abords dans la vallée, et les quartiers résidentiels de Chevry sur le plateau. Entre les deux, des coteaux boisés — et des toitures qui composent avec un environnement très arboré.",
      "Éric Robert intervient chez les Giffois pour l'entretien, la couverture et l'isolation. Devis et déplacement gratuits dans tous les quartiers.",
    ],
    corps: [
      "Sous les arbres de la vallée de Chevreuse, les couvertures giffoises se patinent vite : mousses côté ombre, gouttières chargées à l'automne. Le duo <a href=\"/nettoyage-demoussage-toiture-91/\">démoussage + traitement</a> est l'entretien de référence du secteur, à programmer tous les cinq ans environ.",
      "À Chevry, les maisons des années 70-80 arrivent à l'âge de l'isolation : combles perdus à souffler, rampants à doubler pour les étages aménagés. Ces chantiers relèvent des domaines RGE d'Éric Robert — l'<a href=\"/isolation-des-combles/\">isolation des combles</a> avec les aides qui vont avec.",
    ],
    voisines: ['orsay', 'palaiseau', 'pecqueuse', 'igny'],
  },
  draveil: {
    h1tag: 'devis gratuit, intervention rapide',
    meta: "Couvreur-zingueur à Draveil (91210) : ramonage, démoussage et toiture entre Seine et Sénart par Éric Robert, artisan RGE Qualibat. Devis gratuit.",
    hero: [
      "Des bords de Seine à Champrosay et aux lisières de Sénart, Draveil est une ville de verdure — Port aux Cerises en étendard. Pour les toitures, ce cadre a un revers : arbres et plans d'eau font prospérer mousses et lichens sur les couvertures.",
      "Éric Robert entretient les toits draveillois à l'année : nettoyage, traitements, ramonage, réparations. Devis et déplacement gratuits.",
    ],
    corps: [
      "Le <a href=\"/prestations/ramonage-91/\">ramonage</a> arrive en tête des demandes draveilloises — les cheminées et poêles à bois restent très utilisés dans les quartiers proches de la forêt. Créneaux groupés possibles entre voisins, certificat remis sur place.",
      "Autre classique du secteur : les couvertures sous les arbres de Champrosay ou de Mainville, à surveiller de près. Un <a href=\"/nettoyage-demoussage-toiture-91/\">nettoyage de toiture avec traitement</a> évite que la végétation ne s'installe dans les tuiles — et l'inspection repère les faiblesses avant l'infiltration.",
    ],
    voisines: ['montgeron', 'corbeil-essonnes', 'evry', 'savigny-sur-orge'],
  },
  evry: {
    h1tag: 'votre expert toiture, devis gratuit',
    meta: "Couvreur-zingueur à Évry-Courcouronnes (91000) : Velux, toiture et zinguerie dans la préfecture du 91 par Éric Robert, artisan RGE. Devis gratuit.",
    hero: [
      "Derrière l'image de ville nouvelle, Évry-Courcouronnes garde de vrais quartiers pavillonnaires — le Bras de Fer, le vieux village d'Évry, Courcouronnes côté Canal. Des maisons des années 70-90 dont les toitures atteignent l'âge des premiers grands entretiens.",
      "Éric Robert intervient chez les Évry-Courcouronnais pour la couverture, la zinguerie et les fenêtres de toit. Devis et déplacement gratuits depuis Linas, par la Francilienne.",
    ],
    corps: [
      "La demande la plus marquée du secteur : les fenêtres de toit. Beaucoup de pavillons évryens gagnent une pièce en aménageant l'étage, et la <a href=\"/installateur-de-velux-91/\">pose de Velux par un installateur certifié RGE</a> reste la porte d'entrée du projet — avec les aides correspondantes.",
      "Les toitures des années 80 approchent par ailleurs de leurs quarante ans : tuiles poreuses, zingueries d'origine. Un passage en revue gratuit fait le tri entre simple <a href=\"/nettoyage-demoussage-toiture-91/\">entretien-démoussage</a> et reprises plus sérieuses — sans dramatiser ni minimiser.",
    ],
    voisines: ['corbeil-essonnes', 'draveil', 'montgeron', 'morsang-sur-orge'],
  },
  saclas: {
    h1tag: 'votre professionnel de la toiture',
    meta: "Couvreur-zingueur à Saclas (91690) : couverture, charpente et entretien des maisons de pays par Éric Robert, artisan RGE Qualibat. Devis gratuit.",
    hero: [
      "Village de la haute vallée de la Juine, Saclas aligne longères, fermes reconverties et maisons de bourg le long de la rivière. Des toitures de pays, généreuses et anciennes, qui méritent mieux qu'un dépannage à la va-vite.",
      "Éric Robert intervient dans le Saclasien comme dans tout le sud du département : couverture, charpente, entretien. Le déplacement et le devis restent gratuits.",
    ],
    corps: [
      "Sur les longères saclasiennes, tout commence par les bois : les charpentes anciennes de la vallée ont parfois nourri des générations d'insectes. Le <a href=\"/traitement-de-charpente/\">traitement de charpente</a>, précédé d'un diagnostic gratuit, assainit la structure avant toute réfection.",
      "Les grands pans de tuile plate du village se reprennent dans les règles de l'art : calepinage, teintes, zinguerie discrète. Nos <a href=\"/travaux-de-couverture/\">travaux de couverture</a> vont de la reprise ponctuelle au pan complet, avec un chiffrage poste par poste.",
    ],
    voisines: ['mereville', 'etrechy', 'milly-la-foret', 'arpajon'],
  },
  wissous: {
    h1tag: 'devis gratuit, artisan RGE',
    meta: "Couvreur-zingueur à Wissous (91320) : réparation, isolation et entretien de toiture aux portes d'Orly par Éric Robert, artisan RGE. Devis gratuit.",
    hero: [
      "Commune la plus septentrionale du département, Wissous vit entre son vieux bourg — église, fermes anciennes — et ses quartiers pavillonnaires proches d'Orly et de Fresnes. Des toits de village et des toits de banlieue, à quelques rues d'écart.",
      "Éric Robert monte régulièrement jusqu'aux toits wissoussiens : réparations, entretien, isolation. L'A6 et la N20 gardent le trajet court depuis Linas. Devis gratuit.",
    ],
    corps: [
      "Dans le vieux Wissous, les couvertures anciennes appellent des reprises soignées : tuile plate, faîtages scellés, souches à surveiller. Une <a href=\"/reparation-toiture-fuite-91/\">réparation ciblée</a> prise à temps y évite bien des réfections prématurées.",
      "Côté pavillons, l'enjeu est thermique : sous ces toits des années 60-80, les combles nus laissent filer la chaleur. L'<a href=\"/isolation-des-combles/\">isolation des combles perdus</a>, domaine certifié RGE d'Éric Robert, se rentabilise en quelques hivers, aides déduites.",
    ],
    voisines: ['champlan', 'palaiseau', 'igny', 'linas'],
  },
  pecqueuse: {
    h1tag: 'votre expert toiture',
    meta: "Couvreur-zingueur à Pecqueuse (91470) : couverture, démoussage et charpente dans le pays de Limours par Éric Robert, artisan RGE Qualibat. Devis gratuit.",
    hero: [
      "Entre plateaux agricoles et bois du pays de Limours, Pecqueuse égrène ses hameaux — le bourg, la Folie-Rigault — et leurs maisons rurales aux toits amples. Un secteur calme, où l'on choisit son artisan au bouche-à-oreille.",
      "Éric Robert intervient à Pecqueuse et dans tout le Limourois : couverture, entretien, charpente. Devis et déplacement gratuits, à vingt minutes de Linas par la RD988.",
    ],
    corps: [
      "Les maisons de pays du plateau exposent de grandes surfaces de toiture aux mousses des environs boisés : un <a href=\"/nettoyage-demoussage-toiture-91/\">démoussage avec traitement</a> périodique garde ces couvertures amples en état, à coût maîtrisé rapporté au m².",
      "Fermes et granges du Limourois cachent aussi de belles charpentes à surveiller : avant d'aménager ou d'isoler, le <a href=\"/traitement-de-charpente/\">diagnostic de charpente gratuit</a> dit si les bois sont prêts à porter un projet — ou s'ils réclament un traitement d'abord.",
    ],
    voisines: ['gif-sur-yvette', 'orsay', 'linas', 'la-ville-du-bois'],
  },
  champlan: {
    h1tag: 'devis gratuit, artisan local',
    meta: "Couvreur-zingueur à Champlan (91160) : réparation, entretien et isolation de toiture par Éric Robert, artisan RGE à quelques minutes. Devis gratuit.",
    hero: [
      "Petite commune de la vallée de l'Yvette coincée entre Palaiseau, Longjumeau et les grands axes, Champlan cultive un esprit village : quelques rues pavillonnaires, des maisons familiales, et des habitants qui se connaissent.",
      "Pour les Champlanais, Éric Robert est un voisin : Linas est à dix minutes. Réparations, entretien, isolation — l'artisan se déplace vite et le devis est gratuit.",
    ],
    corps: [
      "Sur les pavillons champlanais, les interventions courantes dominent : tuiles déplacées, gouttières à reprendre, mousse à traiter. La proximité permet de traiter une <a href=\"/reparation-toiture-fuite-91/\">fuite de toiture</a> dans des délais que les grandes entreprises ne tiennent pas.",
      "Les maisons des années 60-70 de la commune gagnent aussi à isoler leurs combles : l'<a href=\"/isolation-des-combles/\">isolation certifiée RGE des combles perdus</a> y est le petit chantier au grand effet — une demi-journée, des aides, des factures en baisse.",
    ],
    voisines: ['palaiseau', 'wissous', 'igny', 'linas'],
  },
  'la-ville-du-bois': {
    h1tag: 'votre professionnel de la toiture',
    meta: "Couvreur-zingueur à La Ville-du-Bois (91620) : entretien, démoussage et réparation de toiture par Éric Robert, artisan RGE voisin. Devis gratuit.",
    hero: [
      "Voisine directe de Linas le long de la N20, La Ville-du-Bois aligne ses quartiers pavillonnaires sous les arbres — la commune porte bien son nom. Pour ses habitants, Éric Robert, installé à Linas, est à cinq minutes : difficile de faire plus proche.",
      "Cette proximité change la nature du service : passage rapide pour un contrôle, tuile recalée dans la journée, entretien programmé sans attente. Devis gratuit, évidemment.",
    ],
    corps: [
      "L'environnement boisé de la commune se retrouve sur les toits : mousses et débris s'installent à l'ombre des chênes. Le <a href=\"/nettoyage-demoussage-toiture-91/\">démoussage de toiture avec traitement</a> est le rendez-vous d'entretien le plus utile aux Urbisylvains — d'autant plus simple à programmer que l'artisan est du canton.",
      "Pour le reste — gouttières, tuiles, velux vieillissants, combles à isoler — le réflexe est le même qu'à Linas : un appel, un passage rapide, un devis honnête. Et en cas de doute sur l'état général, nos <a href=\"/travaux-de-couverture/\">travaux de couverture</a> couvrent toutes les reprises possibles.",
    ],
    voisines: ['linas', 'arpajon', 'sainte-genevieve-des-bois', 'champlan'],
  },
};
