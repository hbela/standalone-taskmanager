import { getDatabase } from '@/lib/database';
import { CreateTaskInput } from '@/types/task';

// Helper to get date string relative to now
const getRelativeDate = (daysOffset: number) => {
  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  return new Date(now.getTime() + daysOffset * oneDay).toISOString();
};

/**
 * Seed the task database with English dummy data
 */
export async function seedDatabaseEn() {
  const tasks: CreateTaskInput[] = [
    {
      title: "Doctor's Appointment",
      description: "Annual checkup with Dr. Smith.",
      priority: 'high',
      dueDate: getRelativeDate(2),
      completed: false,
      taskAddress: "123 Medical Center Dr",
      latitude: 40.7128,
      longitude: -74.0060,
    },
    {
      title: "Grocery Shopping",
      description: "Buy milk, eggs, bread, and fruits.",
      priority: 'medium',
      dueDate: getRelativeDate(0), // Today
      completed: false,
      bill: 50.00,
      billCurrency: 'USD',
    },
    {
      title: "Car Service",
      description: "Oil change and tire rotation.",
      priority: 'medium',
      dueDate: getRelativeDate(-5), // Overdue
      completed: false,
      bill: 120.00,
      billCurrency: 'USD',
    },
    {
      title: "Pay Electricity Bill",
      description: "Pay the monthly electricity bill.",
      priority: 'urgent',
      dueDate: getRelativeDate(1),
      completed: false,
      bill: 85.50,
      billCurrency: 'USD',
    },
    {
      title: "Team Meeting",
      description: "Weekly sync with the development team.",
      priority: 'high',
      dueDate: getRelativeDate(0), // Today
      completed: true,
      completedAt: getRelativeDate(0),
    },
    {
      title: "Gym Workout",
      description: "Leg day routine.",
      priority: 'medium',
      dueDate: getRelativeDate(-1),
      completed: true,
      completedAt: getRelativeDate(-1),
    },
    {
      title: "Read Book",
      description: "Finish reading 'The Pragmatic Programmer'.",
      priority: 'low',
      dueDate: getRelativeDate(7),
      completed: false,
    },
    {
      title: "Call Mom",
      description: "Catch up on family news.",
      priority: 'high',
      dueDate: getRelativeDate(0), // Today
      completed: false,
    },
    {
      title: "Water Plants",
      description: "Water the indoor plants.",
      priority: 'low',
      dueDate: getRelativeDate(3),
      completed: false,
    },
    {
      title: "Submit Project Report",
      description: "Finalize and submit the quarterly report.",
      priority: 'urgent',
      dueDate: getRelativeDate(2),
      completed: false,
    },
    {
      title: "Buy Birthday Gift",
      description: "Get a gift for Sarah's birthday.",
      priority: 'medium',
      dueDate: getRelativeDate(10),
      completed: false,
      bill: 40.00,
      billCurrency: 'USD',
    },
    {
      title: "Clean Garage",
      description: "Organize tools and discard old boxes.",
      priority: 'low',
      completed: false,
    },
    {
      title: "Schedule Dentist",
      description: "Book an appointment for cleaning.",
      priority: 'medium',
      dueDate: getRelativeDate(-10), // Overdue
      completed: false,
    },
    {
      title: "Walk the Dog",
      description: "Take Max for a walk in the park.",
      priority: 'medium',
      dueDate: getRelativeDate(0), // Today
      completed: true,
      completedAt: getRelativeDate(0),
    },
    {
      title: "Update Resume",
      description: "Add recent project experience.",
      priority: 'high',
      dueDate: getRelativeDate(14),
      completed: false,
    },
    {
      title: "Plan Vacation",
      description: "Research destinations for summer trip.",
      priority: 'low',
      completed: false,
    },
    {
      title: "Fix Leaky Faucet",
      description: "Repair the kitchen sink faucet.",
      priority: 'medium',
      dueDate: getRelativeDate(-2),
      completed: false,
      bill: 15.00,
      billCurrency: 'USD',
    },
    {
      title: "Send Emails",
      description: "Reply to pending client emails.",
      priority: 'high',
      dueDate: getRelativeDate(0), // Today
      completed: false,
    },
    {
      title: "Backup Photos",
      description: "Transfer photos from phone to hard drive.",
      priority: 'low',
      dueDate: getRelativeDate(5),
      completed: false,
    },
    {
      title: "Learn TypeScript",
      description: "Complete the advanced TypeScript course.",
      priority: 'medium',
      dueDate: getRelativeDate(30),
      completed: false,
    }
  ];

  await performSeeding(tasks, 'English');
}

/**
 * Seed the task database with Hungarian dummy data
 */
export async function seedDatabaseHu() {
  const tasks: CreateTaskInput[] = [
    {
      title: "Orvosi időpont",
      description: "Éves ellenőrzés Dr. Kovácsnál.",
      priority: 'high',
      dueDate: getRelativeDate(2),
      completed: false,
      taskAddress: "123 Orvosi Központ",
      latitude: 47.4979,
      longitude: 19.0402,
    },
    {
      title: "Bevásárlás",
      description: "Tej, tojás, kenyér és gyümölcsök vásárlása.",
      priority: 'medium',
      dueDate: getRelativeDate(0),
      completed: false,
      bill: 15000,
      billCurrency: 'HUF',
    },
    {
      title: "Autószerviz",
      description: "Olajcsere és kerékcsere.",
      priority: 'medium',
      dueDate: getRelativeDate(-5),
      completed: false,
      bill: 45000,
      billCurrency: 'HUF',
    },
    {
      title: "Villanyszámla befizetése",
      description: "A havi villanyszámla befizetése.",
      priority: 'urgent',
      dueDate: getRelativeDate(1),
      completed: false,
      bill: 12000,
      billCurrency: 'HUF',
    },
    {
      title: "Csapatmegbeszélés",
      description: "Heti egyeztetés a fejlesztői csapattal.",
      priority: 'high',
      dueDate: getRelativeDate(0),
      completed: true,
      completedAt: getRelativeDate(0),
    },
    {
      title: "Edzés",
      description: "Lébnap rutin.",
      priority: 'medium',
      dueDate: getRelativeDate(-1),
      completed: true,
      completedAt: getRelativeDate(-1),
    },
    {
      title: "Könyv olvasása",
      description: "A 'The Pragmatic Programmer' befejezése.",
      priority: 'low',
      dueDate: getRelativeDate(7),
      completed: false,
    },
    {
      title: "Anya felhívása",
      description: "Családi hírek megbeszélése.",
      priority: 'high',
      dueDate: getRelativeDate(0),
      completed: false,
    },
    {
      title: "Növények locsolása",
      description: "A szobanövények meglocsolása.",
      priority: 'low',
      dueDate: getRelativeDate(3),
      completed: false,
    },
    {
      title: "Projektjelentés benyújtása",
      description: "A negyedéves jelentés véglegesítése és benyújtása.",
      priority: 'urgent',
      dueDate: getRelativeDate(2),
      completed: false,
    },
    {
      title: "Születésnapi ajándék",
      description: "Ajándék beszerzése Sára születésnapjára.",
      priority: 'medium',
      dueDate: getRelativeDate(10),
      completed: false,
      bill: 10000,
      billCurrency: 'HUF',
    },
    {
      title: "Garázs takarítása",
      description: "Szerszámok rendszerezése és régi dobozok kidobása.",
      priority: 'low',
      completed: false,
    },
    {
      title: "Fogorvos",
      description: "Időpont foglalása tisztításra.",
      priority: 'medium',
      dueDate: getRelativeDate(-10),
      completed: false,
    },
    {
      title: "Kutyasétáltatás",
      description: "Max sétáltatása a parkban.",
      priority: 'medium',
      dueDate: getRelativeDate(0),
      completed: true,
      completedAt: getRelativeDate(0),
    },
    {
      title: "Önéletrajz frissítése",
      description: "Legutóbbi projekttapasztalatok hozzáadása.",
      priority: 'high',
      dueDate: getRelativeDate(14),
      completed: false,
    },
    {
      title: "Nyaralás tervezése",
      description: "Úti célok keresése a nyári utazáshoz.",
      priority: 'low',
      completed: false,
    },
    {
      title: "Csöpögő csap javítása",
      description: "A konyhai csap megjavítása.",
      priority: 'medium',
      dueDate: getRelativeDate(-2),
      completed: false,
      bill: 5000,
      billCurrency: 'HUF',
    },
    {
      title: "E-mailek küldése",
      description: "Válasz a függőben lévő ügyfél e-mailekre.",
      priority: 'high',
      dueDate: getRelativeDate(0),
      completed: false,
    },
    {
      title: "Fényképek mentése",
      description: "Képek átvitele a telefonról a merevlemezre.",
      priority: 'low',
      dueDate: getRelativeDate(5),
      completed: false,
    },
    {
      title: "TypeScript tanulása",
      description: "A haladó TypeScript tanfolyam befejezése.",
      priority: 'medium',
      dueDate: getRelativeDate(30),
      completed: false,
    }
  ];

  await performSeeding(tasks, 'Hungarian');
}

/**
 * Seed the task database with French dummy data
 */
export async function seedDatabaseFr() {
  const tasks: CreateTaskInput[] = [
    {
      title: "Rendez-vous médecin",
      description: "Bilan annuel avec le Dr. Smith.",
      priority: 'high',
      dueDate: getRelativeDate(2),
      completed: false,
      taskAddress: "123 Centre Médical",
      latitude: 48.8566,
      longitude: 2.3522,
    },
    {
      title: "Courses",
      description: "Acheter du lait, des œufs, du pain et des fruits.",
      priority: 'medium',
      dueDate: getRelativeDate(0),
      completed: false,
      bill: 50.00,
      billCurrency: 'EUR',
    },
    {
      title: "Entretien voiture",
      description: "Vidange et rotation des pneus.",
      priority: 'medium',
      dueDate: getRelativeDate(-5),
      completed: false,
      bill: 120.00,
      billCurrency: 'EUR',
    },
    {
      title: "Facture d'électricité",
      description: "Payer la facture d'électricité mensuelle.",
      priority: 'urgent',
      dueDate: getRelativeDate(1),
      completed: false,
      bill: 85.50,
      billCurrency: 'EUR',
    },
    {
      title: "Réunion d'équipe",
      description: "Point hebdomadaire avec l'équipe de développement.",
      priority: 'high',
      dueDate: getRelativeDate(0),
      completed: true,
      completedAt: getRelativeDate(0),
    },
    {
      title: "Sport",
      description: "Séance jambes.",
      priority: 'medium',
      dueDate: getRelativeDate(-1),
      completed: true,
      completedAt: getRelativeDate(-1),
    },
    {
      title: "Lire un livre",
      description: "Terminer de lire 'The Pragmatic Programmer'.",
      priority: 'low',
      dueDate: getRelativeDate(7),
      completed: false,
    },
    {
      title: "Appeler Maman",
      description: "Prendre des nouvelles de la famille.",
      priority: 'high',
      dueDate: getRelativeDate(0),
      completed: false,
    },
    {
      title: "Arroser les plantes",
      description: "Arroser les plantes d'intérieur.",
      priority: 'low',
      dueDate: getRelativeDate(3),
      completed: false,
    },
    {
      title: "Rapport de projet",
      description: "Finaliser et soumettre le rapport trimestriel.",
      priority: 'urgent',
      dueDate: getRelativeDate(2),
      completed: false,
    },
    {
      title: "Cadeau d'anniversaire",
      description: "Acheter un cadeau pour l'anniversaire de Sarah.",
      priority: 'medium',
      dueDate: getRelativeDate(10),
      completed: false,
      bill: 40.00,
      billCurrency: 'EUR',
    },
    {
      title: "Nettoyer le garage",
      description: "Ranger les outils et jeter les vieilles boîtes.",
      priority: 'low',
      completed: false,
    },
    {
      title: "Rendez-vous dentiste",
      description: "Prendre rendez-vous pour un détartrage.",
      priority: 'medium',
      dueDate: getRelativeDate(-10),
      completed: false,
    },
    {
      title: "Promener le chien",
      description: "Emmener Max faire une promenade au parc.",
      priority: 'medium',
      dueDate: getRelativeDate(0),
      completed: true,
      completedAt: getRelativeDate(0),
    },
    {
      title: "Mettre à jour le CV",
      description: "Ajouter l'expérience récente du projet.",
      priority: 'high',
      dueDate: getRelativeDate(14),
      completed: false,
    },
    {
      title: "Planifier les vacances",
      description: "Rechercher des destinations pour le voyage d'été.",
      priority: 'low',
      completed: false,
    },
    {
      title: "Réparer le robinet",
      description: "Réparer le robinet de l'évier de la cuisine qui fuit.",
      priority: 'medium',
      dueDate: getRelativeDate(-2),
      completed: false,
      bill: 15.00,
      billCurrency: 'EUR',
    },
    {
      title: "Envoyer des e-mails",
      description: "Répondre aux e-mails clients en attente.",
      priority: 'high',
      dueDate: getRelativeDate(0),
      completed: false,
    },
    {
      title: "Sauvegarder les photos",
      description: "Transférer les photos du téléphone vers le disque dur.",
      priority: 'low',
      dueDate: getRelativeDate(5),
      completed: false,
    },
    {
      title: "Apprendre TypeScript",
      description: "Terminer le cours avancé de TypeScript.",
      priority: 'medium',
      dueDate: getRelativeDate(30),
      completed: false,
    }
  ];

  await performSeeding(tasks, 'French');
}

/**
 * Seed the task database with German dummy data
 */
export async function seedDatabaseDe() {
  const tasks: CreateTaskInput[] = [
    {
      title: "Arzttermin",
      description: "Jährliche Untersuchung bei Dr. Schmidt.",
      priority: 'high',
      dueDate: getRelativeDate(2),
      completed: false,
      taskAddress: "123 Medical Center",
      latitude: 52.5200,
      longitude: 13.4050,
    },
    {
      title: "Einkaufen",
      description: "Milch, Eier, Brot und Obst kaufen.",
      priority: 'medium',
      dueDate: getRelativeDate(0),
      completed: false,
      bill: 50.00,
      billCurrency: 'EUR',
    },
    {
      title: "Autoservice",
      description: "Ölwechsel und Reifenwechsel.",
      priority: 'medium',
      dueDate: getRelativeDate(-5),
      completed: false,
      bill: 120.00,
      billCurrency: 'EUR',
    },
    {
      title: "Stromrechnung",
      description: "Die monatliche Stromrechnung bezahlen.",
      priority: 'urgent',
      dueDate: getRelativeDate(1),
      completed: false,
      bill: 85.50,
      billCurrency: 'EUR',
    },
    {
      title: "Team-Meeting",
      description: "Wöchentliche Besprechung mit dem Entwicklerteam.",
      priority: 'high',
      dueDate: getRelativeDate(0),
      completed: true,
      completedAt: getRelativeDate(0),
    },
    {
      title: "Fitnessstudio",
      description: "Beintraining.",
      priority: 'medium',
      dueDate: getRelativeDate(-1),
      completed: true,
      completedAt: getRelativeDate(-1),
    },
    {
      title: "Buch lesen",
      description: "'The Pragmatic Programmer' zu Ende lesen.",
      priority: 'low',
      dueDate: getRelativeDate(7),
      completed: false,
    },
    {
      title: "Mama anrufen",
      description: "Familienneuigkeiten austauschen.",
      priority: 'high',
      dueDate: getRelativeDate(0),
      completed: false,
    },
    {
      title: "Pflanzen gießen",
      description: "Die Zimmerpflanzen gießen.",
      priority: 'low',
      dueDate: getRelativeDate(3),
      completed: false,
    },
    {
      title: "Projektbericht",
      description: "Den Vierteljahresbericht fertigstellen und einreichen.",
      priority: 'urgent',
      dueDate: getRelativeDate(2),
      completed: false,
    },
    {
      title: "Geschenk kaufen",
      description: "Ein Geschenk für Sarahs Geburtstag besorgen.",
      priority: 'medium',
      dueDate: getRelativeDate(10),
      completed: false,
      bill: 40.00,
      billCurrency: 'EUR',
    },
    {
      title: "Garage aufräumen",
      description: "Werkzeuge ordnen und alte Kartons entsorgen.",
      priority: 'low',
      completed: false,
    },
    {
      title: "Zahnarzttermin",
      description: "Termin für die Zahnreinigung buchen.",
      priority: 'medium',
      dueDate: getRelativeDate(-10),
      completed: false,
    },
    {
      title: "Hund ausführen",
      description: "Mit Max im Park spazieren gehen.",
      priority: 'medium',
      dueDate: getRelativeDate(0),
      completed: true,
      completedAt: getRelativeDate(0),
    },
    {
      title: "Lebenslauf",
      description: "Aktuelle Projekterfahrungen hinzufügen.",
      priority: 'high',
      dueDate: getRelativeDate(14),
      completed: false,
    },
    {
      title: "Urlaub planen",
      description: "Reiseziele für den Sommerurlaub recherchieren.",
      priority: 'low',
      completed: false,
    },
    {
      title: "Wasserhahn reparieren",
      description: "Den tropfenden Wasserhahn in der Küche reparieren.",
      priority: 'medium',
      dueDate: getRelativeDate(-2),
      completed: false,
      bill: 15.00,
      billCurrency: 'EUR',
    },
    {
      title: "E-Mails senden",
      description: "Auf ausstehende Kunden-E-Mails antworten.",
      priority: 'high',
      dueDate: getRelativeDate(0),
      completed: false,
    },
    {
      title: "Fotos sichern",
      description: "Fotos vom Telefon auf die Festplatte übertragen.",
      priority: 'low',
      dueDate: getRelativeDate(5),
      completed: false,
    },
    {
      title: "TypeScript lernen",
      description: "Den fortgeschrittenen TypeScript-Kurs abschließen.",
      priority: 'medium',
      dueDate: getRelativeDate(30),
      completed: false,
    }
  ];

  await performSeeding(tasks, 'German');
}

/**
 * Shared function to perform the database insertion
 */
async function performSeeding(tasks: CreateTaskInput[], languageName: string) {
  const db = await getDatabase();
  
  try {
    for (const task of tasks) {
      await db.runAsync(
        `INSERT INTO tasks (
          title, description, priority, dueDate, completed, 
          taskAddress, latitude, longitude, bill, billCurrency, 
          completedAt, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          task.title,
          task.description || null,
          task.priority || 'medium',
          task.dueDate || null,
          task.completed ? 1 : 0,
          task.taskAddress || null,
          task.latitude || null,
          task.longitude || null,
          task.bill || null,
          task.billCurrency || null,
          task.completedAt || null,
          new Date().toISOString(),
          new Date().toISOString()
        ]
      );
    }
    console.log(`Database seeded successfully with 20 ${languageName} tasks.`);
  } catch (error) {
    console.error(`Error seeding ${languageName} database:`, error);
  }
}
