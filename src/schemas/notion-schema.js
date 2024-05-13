import { object, string, array, record, union, z } from 'zod';

// Define Zod schema for the text content
const textContentSchema = object({
  content: string(),
  link: string().url().optional()
});

// Define Zod schema for the rich text
const richTextSchema = object({
  rich_text: (textContentSchema)
});

// Define Zod schema for the select property
const selectSchema = object({
  name: string()
});

// Define Zod schema for the dataTest object
const dataTestSchema = z.object({
  cover: object({
    type: string(),
    external: z.object({
      url: z.string().url({ message: "Invalid url" })
    })
  }),
  icon: object({
    type: string(),
    emoji: string()
  }),
  parent: object({
    type: string(),
    database_id: string() // Assuming database_id is a string
  }),
  properties: object({
    Name: object({
      title: array(
        object({
          text: object({
            content: string()
          }).optional()
        })
      ).optional(),
    }).optional(),
    Description: object({
      rich_text: array(
        object({
          text: object({
            content: string()
          }).optional()
        }).optional()
      )
    }).optional(),
    'Food group': object({
      select: selectSchema.optional()
    }).optional()
  }).optional(),
  children: array(
    object({
      object: string(),
      heading_2: object({ // Update richTextSchema to object
        rich_text: array(
          object({
            text: object({
              content: string()
            }).optional()
          }).optional()
        )
      }).optional(),
    }),
    /*object({
      object: string(),
      paragraph: object({ // Update richTextSchema to object
        rich_text: array(
          object({
            text: object({
              content: string(),
              link: object({
                url: z.string().url({ message: "Invalid url" })
              })
            }).optional()
          }).optional()
        ),
        color: string()
      }).optional(),
    })*/
  ).optional(),
}).partial();





const db = {
  "cover": {
    "type": "external",
    "external": {
      "url": "https://www.pngitem.com/pimgs/m/46-461661_png-transparent-cat-image-funny-cute-cat-png.png"
    }
  },
  "icon": {
    "type": "emoji",
    "emoji": "🥬"
  },
  "parent": {
    "type": "database_id",
    "database_id": "b91ab2b8b8584b229867dfebd2a7092f"
  },
  "properties": {
    "Name": {
      "title": [
        {
          "text": {
            "content": "Bullet traces"
          }
        }
      ]
    },
    "Description": {
      "rich_text": [
        {
          "text": {
            "content": "Bullet traces (vandalism; view from inside) in the watchtower in the former arsenal in the Dernekamp hamlet, Kirchspiel, Dülmen, North Rhine-Westphalia, Germany"
          }
        }
      ]
    },
    "Food group": {
      "select": {
        "name": "Bullet"
      }
    }
  },
  "children": [
    {
      "object": "block",
      "heading_2": {
        "rich_text": [
          {
            "text": {
              "content": "Lacinato kale"
            }
          }
        ]
      }
    },
    {
      "object": "block",
      "paragraph": {
        "rich_text": [
          {
            "text": {
              "content": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
              "link": {
                "url": "https://en.wikipedia.org/wiki/Lacinato_kale"
              }
            }
          }
        ],
        "color": "default"
      }
    }
  ]
}

export function validatePage(input) {
  const validationResult = dataTestSchema.partial().safeParse(input);
  if (!validationResult.success) {
    console.error(validationResult.error.errors);
  }
  console.log(JSON.stringify(validationResult));
  //console.log(validationResult)
  return validationResult;
}


export function validatePartialPage (input) {
  return dataTestSchema.partial().safeParse(input)
}

//validatePage(db);