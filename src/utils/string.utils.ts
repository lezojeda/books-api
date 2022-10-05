export const stringFormat = (stringToFormat: string, placeholders: string[]) => {
    return stringToFormat.replace(/{(\d+)}/g, (match, matchNumber) => { 
        return placeholders[matchNumber]
      })
}