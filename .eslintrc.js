/// =================================================================================================================================================
/// Task runner:
///     "eslint "eslint \"./src/**/*.{js,ts,tsx}\" --quiet --fix"
///     notice, that eslint fires no matches when using single quotes instead of double quotes.
///
/// @see https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project
/// =================================================================================================================================================
module.exports = {
    // ESLint will stop looking in parent folders once it finds a configuration with "root": true.
    // https://eslint.org/docs/user-guide/configuring/configuration-files#adding-shared-settings
    root: true,
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser

    // https://eslint.org/docs/user-guide/configuring/language-options#specifying-parser-options
    parserOptions: {
        ecmaVersion: 12,        // Allows for the parsing of ECMAScript 2021 features
        sourceType: "module",   // Allows for the use of imports
    },

    // https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
    env: {
        node: true,             // Node.js global variables and Node.js scoping.
    },

    overrides: [
        {
            files: [
                "**/*.test.ts",
                "**/*.spec.ts",
                "__tests__/*.*"
            ],
            env: {
                // Jest global variables.
                jest: true
            }
        }
    ],

    extends: [
        "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin

        // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        // "prettier/@typescript-eslint", 

        // Enables eslint-plugin-prettier and eslint-config-prettier. 
        // This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        // "plugin:prettier/recommended", 
    ],

    rules: {
        "max-len": ["warn", { code: 180 }],
        "max-lines": ["warn", { max: 300, skipBlankLines: true }],
        "semi": ["error", "always", { "omitLastInOneLineBlock": false }],
        "no-multiple-empty-lines": ["warn", { max: 1, maxBOF: 1 }],
        // complexity: ["error", { max: 4 }],

        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",

        // https://github.com/typescript-eslint/typescript-eslint/issues/2063
        "@typescript-eslint/ban-types": [
            "error",
            {
                extendDefaults: true,
                types: {
                    "{}": false,
                },
            },
        ],

        "@typescript-eslint/no-empty-interface": [
            "warn",
            {
                allowSingleExtends: false,
            },
        ],

        // API specific - these settings are different for web project.
        // On API, you have nothing else then the console to print out the error ;)
        // https://eslint.org/docs/rules/no-console
        "no-console": ["off"],
    },
};
